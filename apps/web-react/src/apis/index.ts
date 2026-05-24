import axios from 'axios'
import { refreshTokenApi } from './auth'
import { message } from 'antd'
import { useUserStore, getAccessToken, getRefreshToken } from '@/stores/user'

export const uploadUrl = import.meta.env.DEV ? 'http://192.168.10.23:9000' : 'http://线上地址待定'
export const socketUrl = import.meta.env.DEV ? 'http://localhost:3000' : 'http://线上地址待定'
export const timeout = 50000

// 导航函数，在App中注入
let navigate: ((path: string) => void) | null = null
export const setNavigate = (fn: (path: string) => void) => { navigate = fn }

//server服务器接口
export const serverApi = axios.create({
    baseURL: '/api/v1',
    timeout,
})

let isRefreshing = false
let requestQueue: ((newAccessToken: string) => void)[] = []

//请求拦截器
serverApi.interceptors.request.use(config => {
    const accessToken = getAccessToken()
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

//响应拦截器
serverApi.interceptors.response.use(res => {
    return res.data
}, async error => {
    if (error.code === 'ERR_NETWORK') {
        message.error('网络连接失败,请重试')
        return Promise.reject(error)
    }
    if (error.response?.status !== 401) {
        message.error('服务器异常,请稍后再试')
        return Promise.reject(error)
    }
    //处理401的情况
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    const originalRequest = error.config

    if (!accessToken || !refreshToken) {
        useUserStore.getState().logout()
        message.error('登录已过期,请重新登录')
        navigate?.('/')
        return Promise.reject(error)
    }
    if (isRefreshing) {
        return new Promise((resolve) => {
            requestQueue.push((newAccessToken: string) => {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                resolve(serverApi(originalRequest))
            })
        })
    }
    //刷新token
    isRefreshing = true
    try {
        const newToken = await refreshTokenApi({ refreshToken })
        if (newToken.success) {
            useUserStore.getState().updateToken(newToken.data)
        } else {
            useUserStore.getState().logout()
            message.error(newToken.message || '登录已过期,请重新登录')
            navigate?.('/')
            return Promise.reject(error)
        }
        const newAccessToken = newToken.data.accessToken
        requestQueue.forEach(callback => callback(newAccessToken))
        return serverApi(originalRequest)
    } catch (err) {
        return Promise.reject(err)
    } finally {
        requestQueue = []
        isRefreshing = false
    }
})

//ai服务器接口
export const aiApi = axios.create({
    baseURL: '/ai/v1',
    timeout,
})

aiApi.interceptors.response.use(res => {
    return res.data
})

export interface Response<T = any> {
    timestamp: string
    path: string
    message: string
    code: number
    success: boolean
    data: T
}
