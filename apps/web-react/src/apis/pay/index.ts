import { serverApi, type Response } from '..'
import type { CreatePayDto, QueryPayDto, QueryPayResult, ResultPay } from '@en/common/pay'

export const createPay = (data: CreatePayDto) =>
    serverApi.post('/pay/create', data) as Promise<Response<ResultPay>>

export const queryPay = (data: QueryPayDto) =>
    serverApi.post('/pay/query', data) as Promise<Response<QueryPayResult>>
