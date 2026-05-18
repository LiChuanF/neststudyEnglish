export interface CreatePayDto {
    subject: string; //订单标题
    body: string; //附加信息 可以自定义内容
    total_amount: string; //订单金额
    courseId: string; //课程ID
}

export interface QueryPayDto {
    outTradeNo: string; // 商户订单号
}

export interface ResultPay {
    payUrl: string; //支付URL
    timeExpire: number; //过期时间
    outTradeNo: string; // 商户订单号，用于主动查单
}

export interface QueryPayResult {
    paid: boolean;
    tradeStatus: string;
}
