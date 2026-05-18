import { Injectable } from '@nestjs/common';
import { PrismaService, PayService as SharedPayService, ResponseService } from '@libs/shared';
import * as nanoid from 'nanoid';
import dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { SocketGateway } from '../socket/socket.gateway';
import { TradeStatus } from '@libs/shared/generated/prisma/enums'

// 类型
import type { CreatePayDto } from '@en/common/pay';
import type { TokenPayload } from '@en/common/user';
import type { Request } from 'express';
@Injectable()
export class PayService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        private readonly responseService: ResponseService,
        private readonly socketGateway: SocketGateway,
        private readonly sharedPayService: SharedPayService
    ) { }

    // 生成订单号
    private createTradeNo() {
        const prifix = 'XM';//订单前缀
        return `${prifix}-${nanoid.nanoid(12)}`;
    }

    // 创建支付
    async create(createPayDto: CreatePayDto, user: TokenPayload) {
        //购买过课程不能重复购买
        const courseRecord = await this.prismaService.courseRecord.findFirst({
            where: {
                userId: user.userId,
                courseId: createPayDto.courseId,
            },
        })
        if (courseRecord) {
            return this.responseService.error(null, '您已经购买过该课程',);
        }
        const result = await this.prismaService.$transaction(async (tx) => {
            //1. 创建订单表 但是状态是未支付
            const outTradeNo = this.createTradeNo();
            await tx.paymentRecord.create({
                data: {
                    userId: user.userId, //用户id
                    outTradeNo: outTradeNo, //订单编号
                    amount: createPayDto.total_amount, //支付金额
                    subject: createPayDto.subject, //支付主题
                    body: createPayDto.body, //支付内容
                }
            })
            //2.支付宝SDK发起支付生成url
            const dateTime = dayjs().add(1, 'minute') //当前的时间增加了一分钟 为了测试我弄的快一点
            const payUrl = this.sharedPayService.getAlipaySdk().pageExecute("alipay.trade.page.pay", 'GET', {
                bizContent: {
                    out_trade_no: outTradeNo, //订单编号
                    total_amount: createPayDto.total_amount, //支付金额
                    subject: createPayDto.subject, //支付主题
                    body: JSON.stringify({
                        courseId: createPayDto.courseId, //课程id
                        userId: user.userId, //用户id
                    }), //支付内容
                    product_code: 'FAST_INSTANT_TRADE_PAY', //产品编码
                    time_expire: dateTime.format('YYYY-MM-DD HH:mm:ss'), //过期时间
                },
                notify_url: `${this.configService.get<string>('ALIPAY_NOTIFY_URL')!}/api/v1/pay/notify`,
            })
            return {
                payUrl, //返回支付宝的支付链接
                timeExpire: dateTime.toDate().getTime() //迎合Elementplus组件要求是时间戳
            }
        })
        return this.responseService.success(result);
    }

    // 支付成功回调
    async notify(req: Request) {
        //解析支付内容
        const body = JSON.parse(req.body.body) as { courseId: string, userId: string };
        // 事务操作 确保支付成功后 才创建课程购买记录
        this.prismaService.$transaction(async (tx) => {
            //1. 更新订单表 支付时间 + 支付宝交易号 + 支付状态
            const paymentRecord = await tx.paymentRecord.update({
                //根据订单编号更新订单表
                where: {
                    outTradeNo: req.body.out_trade_no,
                },
                data: {
                    tradeNo: req.body.trade_no, // 支付宝交易号
                    tradeStatus: TradeStatus.TRADE_SUCCESS, // 支付状态
                    sendPayTime: dayjs(req.body.gmt_payment).toDate() // 支付时间
                }
            })
            //2. 创建课程购买记录
            await tx.courseRecord.create({
                data: {
                    userId: body.userId,
                    courseId: body.courseId,
                    isPurchased: true,
                    paymentRecordId: paymentRecord.id,
                }
            })
            //加一个通知前端socket
            this.socketGateway.emitPaymentSuccess(body.userId);
        })
        return true
    }

}
