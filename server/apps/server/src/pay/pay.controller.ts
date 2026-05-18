import { Controller, Post, Body, UseGuards, Req, All, Res } from '@nestjs/common';
import { PayService } from './pay.service';
import type { CreatePayDto, QueryPayDto } from '@en/common/pay';
import { AuthGuard } from '@libs/shared/auth/auth.guard';
import type { Request, Response } from 'express';

@Controller('pay')
export class PayController {
    constructor(private readonly payService: PayService) { }

    @UseGuards(AuthGuard) // 需要登录
    @Post('create')
    create(@Body() createPayDto: CreatePayDto, @Req() req: Request) {
        const user = req.user;
        return this.payService.create(createPayDto, user);
    }

    @UseGuards(AuthGuard)
    @Post('query')
    query(@Body() queryPayDto: QueryPayDto, @Req() req: Request) {
        return this.payService.query(queryPayDto.outTradeNo, req.user);
    }

    // 支付宝异步通知：须返回纯文本 success/fail，不能走统一 JSON 包装
    @All('notify')
    async notify(@Req() req: Request, @Res() res: Response) {
        try {
            await this.payService.handleNotify(req);
            res.type('text/plain').send('success');
        } catch {
            res.type('text/plain').send('fail');
        }
    }
}
