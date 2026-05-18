import { IS_SHOW_LOGIN } from '@/components/Login/type'
import { inject, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { logout as logoutApi } from '@/apis/user'

export const useLogin = () => {
    const isShowLogin = inject(IS_SHOW_LOGIN, ref(false))
    const userStore = useUserStore()
    const login = () => {
        return new Promise((resolve, reject) => {
            if (userStore.getUser) {
                resolve(true) //用户已登录
            } else {
                isShowLogin.value = true //显示登录弹窗
                reject(false)
            }
        })
    }
    const hide = () => {
        isShowLogin.value = false
    }

    const logout = async () => {
        if (userStore.getAccessToken) {
            try {
                await logoutApi()
            } catch {
                // 网络失败仍清空本地登录态
            }
        }
        userStore.logout()
        router.push('/')
    }
    return {
        login,
        hide,
        logout
    }
}