import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/user'
import { useLoginContext } from '@/components/Login/loginContext'
import { logout as logoutApi } from '@/apis/user'

export const useLogin = () => {
    const { showLogin, hideLogin } = useLoginContext()
    const user = useUserStore((s) => s.user)
    const logoutStore = useUserStore((s) => s.logout)
    const navigate = useNavigate()

    const login = useCallback(() => {
        return new Promise<boolean>((resolve, reject) => {
            if (user) {
                resolve(true)
            } else {
                showLogin()
                reject(false)
            }
        })
    }, [user, showLogin])

    const hide = useCallback(() => {
        hideLogin()
    }, [hideLogin])

    const logout = useCallback(async () => {
        const accessToken = useUserStore.getState().user?.token.accessToken
        if (accessToken) {
            try {
                await logoutApi()
            } catch {
                // 网络失败仍清空本地登录态
            }
        }
        logoutStore()
        navigate('/')
    }, [logoutStore, navigate])

    return { login, hide, logout }
}
