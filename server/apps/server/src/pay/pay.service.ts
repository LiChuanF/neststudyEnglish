import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService, PayService as SharedPayService, ResponseService } from '@libs/shared';
import * as nanoid from 'nanoid';
import dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { SocketGateway } from '../socket/socket.gateway';
import { TradeStatus } from '@libs/shared/generated/prisma/enums'
import type { CreatePayDto } from '@en/common/pay';
import type { TokenPayload } from '@en/common/user';
import type { Request } from 'express';

/** 存在订单 body 字段里的业务数据（JSON 字符串解析后的结构） */
interface PayBizBody {
    courseId: string;
    userId: string;
}

@Injectable()
export class PayService {
    private readonly logger = new Logger(PayService.name);
    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly responseService: ResponseService,
        private readonly socketGateway: SocketGateway,
        private readonly sharedPayService: SharedPayService
    ) { }

    /** 生成商户订单号，前缀 XM + 12 位随机串，需全局唯一 */
    private createTradeNo() {
        const prifix = 'XM';
        return `${prifix}-${nanoid.nanoid(12)}`;
    }

    /**
     * 组装「支付附加信息」JSON 字符串。
     * 会同时写入：① 本地 paymentRecord.body  ② 支付宝下单时的 body 参数。
     * 支付成功后在异步回调 / 主动查单里原样带回，用来知道要给哪个用户开通哪门课。
     */
    private buildPayBody(courseId: string, userId: string): string {
        return JSON.stringify({ courseId, userId } satisfies PayBizBody);
    }

    /** 把 buildPayBody 生成的 JSON 字符串解析回对象 */
    private parsePayBody(body: string): PayBizBody {
        return JSON.parse(body) as PayBizBody;
    }

    /**
     * 支付成功后的落库（notify 与 query 共用）。
     * 1. 更新订单：支付宝交易号、状态、付款时间
     * 2. 若无课程购买记录则创建 courseRecord
     * @returns true=本次刚完成支付；false=订单已是成功态（幂等，避免重复开课）
     */
    private async fulfillPayment(params: {
        outTradeNo: string; // 商户订单号
        tradeNo: string; // 支付宝交易号
        gmtPayment: string; // 支付时间
        payBody: string; // 支付附加信息
    }): Promise<boolean> {
        const { outTradeNo, tradeNo, gmtPayment, payBody } = params;
        const meta = this.parsePayBody(payBody);

        //去 paymentRecord 表里，查找 outTradeNo 等于某个值的唯一记录
        const existing = await this.prismaService.paymentRecord.findUnique({
            where: { outTradeNo },
        });
        if (!existing) {
            throw new BadRequestException('订单不存在');
        }
        if (existing.tradeStatus === TradeStatus.TRADE_SUCCESS) {
            return false;
        }

        await this.prismaService.$transaction(async (tx) => {
            //更新订单状态为成功
            const paymentRecord = await tx.paymentRecord.update({
                where: { outTradeNo },
                data: {
                    tradeNo,
                    tradeStatus: TradeStatus.TRADE_SUCCESS,
                    sendPayTime: dayjs(gmtPayment).toDate(),
                },
            });

            //校验用户是否已购买该课程
            const courseExists = await tx.courseRecord.findUnique({
                where: {
                    userId_courseId: {
                        userId: meta.userId,
                        courseId: meta.courseId,
                    },
                },
            });
            if (!courseExists) {
                await tx.courseRecord.create({
                    data: {
                        userId: meta.userId,
                        courseId: meta.courseId,
                        isPurchased: true,
                        paymentRecordId: paymentRecord.id,
                    },
                });
            }
        });
        return true;
    }

    /** 仅在本轮 newly 完成支付时，通过 WebSocket 通知前端关弹窗 */
    private notifyPaymentSuccess(payBody: string, shouldEmit: boolean) {
        if (!shouldEmit) return;
        const meta = this.parsePayBody(payBody);
        this.socketGateway.emitPaymentSuccess(meta.userId);
    }

    /**
     * 创建支付订单并返回收银台链接。
     * 流程：校验未购 → 写未支付订单 → 调支付宝 page.pay 拿 payUrl。
     */
    async create(createPayDto: CreatePayDto, user: TokenPayload) {
        const courseRecord = await this.prismaService.courseRecord.findFirst({
            where: {
                userId: user.userId,
                courseId: createPayDto.courseId,
                isPurchased: true,
            },
        })
        if (courseRecord) {
            return this.responseService.error(null, '您已经购买过该课程',);
        }
        const payBody = this.buildPayBody(createPayDto.courseId, user.userId);
        const result = await this.prismaService.$transaction(async (tx) => {
            const outTradeNo = this.createTradeNo();
            await tx.paymentRecord.create({
                data: {
                    userId: user.userId,
                    outTradeNo,
                    amount: createPayDto.total_amount,
                    subject: createPayDto.subject,
                    body: payBody,
                }
            })
            const dateTime = dayjs().add(1, 'minute') // 测试用 1 分钟过期，正式环境可改为 15/30 分钟
            const payUrl = this.sharedPayService.getAlipaySdk().pageExecute("alipay.trade.page.pay", 'GET', {
                bizContent: {
                    out_trade_no: outTradeNo,
                    total_amount: createPayDto.total_amount,
                    subject: createPayDto.subject,
                    body: payBody, // 与库表 body 一致，回调里用 postData.body 解析 courseId
                    product_code: 'FAST_INSTANT_TRADE_PAY',
                    time_expire: dateTime.format('YYYY-MM-DD HH:mm:ss'),
                },
                notify_url: `${this.configService.get<string>('ALIPAY_NOTIFY_URL')!}/api/v1/pay/notify`,
            })
            return {
                payUrl,
                timeExpire: dateTime.toDate().getTime(),
                outTradeNo, // 给前端轮询查单用
            }
        })
        return this.responseService.success(result);
    }

    /**
     * 支付宝异步通知（服务器 POST，需公网 notify_url）。
     * 验签 → 仅处理 TRADE_SUCCESS → 落库 → 可选推送 Socket。
     */
    async handleNotify(req: Request) {
        const postData = req.body as Record<string, string>;
        if (!this.sharedPayService.getAlipaySdk().checkNotifySign(postData)) {
            throw new BadRequestException('验签失败');
        }
        if (postData.trade_status !== 'TRADE_SUCCESS') {
            return;
        }
        const fulfilled = await this.fulfillPayment({
            outTradeNo: postData.out_trade_no,
            tradeNo: postData.trade_no,
            gmtPayment: postData.gmt_payment,
            payBody: postData.body,
        });
        this.notifyPaymentSuccess(postData.body, fulfilled);
    }

    /**
     * 主动查单：本地未支付时调 alipay.trade.query 问支付宝真实状态。
     * 用于本地无内网穿透、异步回调不到时的兜底；前端支付中轮询此接口。
     */
    async query(outTradeNo: string, user: TokenPayload) {
        const record = await this.prismaService.paymentRecord.findUnique({
            where: { outTradeNo },
        });
        if (!record) {
            return this.responseService.error(null, '订单不存在', 404);
        }
        if (record.userId !== user.userId) {
            return this.responseService.error(null, '无权查询该订单', 403);
        }
        if (record.tradeStatus === TradeStatus.TRADE_SUCCESS) {
            return this.responseService.success({ paid: true, tradeStatus: record.tradeStatus });
        }
        try {
            // 调用支付宝查询接口
            const result = await this.sharedPayService.getAlipaySdk().exec('alipay.trade.query', {
                bizContent: { out_trade_no: outTradeNo },
            });
            // 校验查询结果是否成功
            // code: 10000 成功
            // tradeStatus: TRADE_SUCCESS 成功
            // tradeStatus: WAIT_BUYER_PAY 待付款（还没付）
            // tradeStatus: TRADE_CLOSED 已关闭
            // tradeStatus: TRADE_FINISHED 交易结束（不可退款）
            if (result.code !== '10000') {
                return this.responseService.error(null, result.subMsg || result.msg, 500);
            }
            // 校验订单状态是否成功
            const tradeStatus = (result.tradeStatus ?? result.trade_status) as string;
            if (tradeStatus !== 'TRADE_SUCCESS') {
                return this.responseService.success({ paid: false, tradeStatus });
            }
            const fulfilled = await this.fulfillPayment({
                outTradeNo,
                tradeNo: (result.tradeNo ?? result.trade_no) as string,
                gmtPayment: (result.sendPayDate ?? result.send_pay_date ?? dayjs().format('YYYY-MM-DD HH:mm:ss')) as string,
                payBody: record.body, // 查单接口不返回 body，用创建订单时存的
            });
            this.notifyPaymentSuccess(record.body, fulfilled);
            return this.responseService.success({ paid: true, tradeStatus: TradeStatus.TRADE_SUCCESS });
        } catch (error) {
            this.logger.error(`查单失败 outTradeNo=${outTradeNo}`, error);
            return this.responseService.error(null, '查询支付状态失败', 500);
        }
    }
}
