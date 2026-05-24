import axios from 'axios'
import type { Token } from '@en/common/user'
import type { Response } from '../index'

const refreshServer = axios.create({
    baseURL: '/api/v1',
    timeout: 50000,
})

//响应拦截器
refreshServer.interceptors.response.use(res => {
    return res.data
}, error => {
    return Promise.reject(error)
})

//隔离的刷新token接口 防止死循环
export const refreshTokenApi = (data: Omit<Token, 'accessToken'>) =>
    refreshServer.post('/user/refresh-token', data) as Promise<Response<Token>>
