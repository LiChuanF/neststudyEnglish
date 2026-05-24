import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { WebResultUser, Token, UserUpdate } from '@en/common/user'

interface UserState {
    user: WebResultUser | null
    setUser: (params: WebResultUser) => void
    logout: () => void
    updateToken: (newToken: Token) => void
    updateUser: (params: UserUpdate) => void
    updateUserWordNumber: (wordNumber: number) => void
}

export const useUserStore = create<UserState>()(
    // persist中第一个参数是一个函数，接收set方法用于更新状态，返回一个对象包含状态和更新状态的方法；第二个参数是配置对象，这里指定了存储的名称为'user'，数据将被保存在localStorage中，键名为'user'。
    persist(
        (set) => ({
            user: null,

            setUser: (params) => set({ user: params }),

            logout: () => set({ user: null }),

            //更新token
            updateToken: (newToken) =>
                set((state) => {
                    if (!state.user) return state
                    return { user: { ...state.user, token: newToken } }
                }),

            //更新用户信息
            updateUser: (params) =>
                set((state) => {
                    if (!state.user) return state
                    return {
                        user: {
                            ...state.user,
                            name: params.name,
                            email: params.email,
                            address: params.address,
                            avatar: params.avatar,
                            bio: params.bio,
                            isTimingTask: params.isTimingTask,
                            timingTaskTime: params.timingTaskTime,
                        },
                    }
                }),

            //更新用户单词数量
            updateUserWordNumber: (wordNumber) =>
                set((state) => {
                    if (!state.user) return state
                    return { user: { ...state.user, wordNumber } }
                }),
        }),
        { name: 'user' }
    )
)

// 在非React组件中使用的工具函数
export const getAccessToken = () => useUserStore.getState().user?.token.accessToken
export const getRefreshToken = () => useUserStore.getState().user?.token.refreshToken
export const getUpdateUserInfo = (): UserUpdate | null => {
    const user = useUserStore.getState().user
    if (!user) return null
    return {
        name: user.name,
        email: user.email,
        address: user.address,
        avatar: user.avatar,
        bio: user.bio,
        isTimingTask: user.isTimingTask,
        timingTaskTime: user.timingTaskTime,
    }
}
