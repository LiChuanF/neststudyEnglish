import { Controller, Post, Body, UseGuards, Req, All } from '@nestjs/common';
import { PayService } from './pay.service';
import type { CreatePayDto } from '@en/common/pay';
import { AuthGuard } from '@libs/shared/auth/auth.guard';
import type { Request } from 'express';

@Controller('pay')
export class PayController {
    constructor(private readonly payService: PayService) { }

    @UseGuards(AuthGuard) // 需要登录
    @Post('create')
    create(@Body() createPayDto: CreatePayDto, @Req() req: Request) {
        const user = req.user;
        return this.payService.create(createPayDto, user);
    }

    @All('notify') // 支付通知
    notify(@Req() req: Request) {
        return this.payService.notify(req);
    }

}
