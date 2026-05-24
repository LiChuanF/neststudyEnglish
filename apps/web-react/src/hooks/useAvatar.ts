import { useMemo } from 'react'
import { uploadUrl } from '@/apis'
import defaultAvatar from '@/assets/images/avatar/default-avatar.png'
import { useUserStore } from '@/stores/user'

export const useAvatar = () => {
    const user = useUserStore((s) => s.user)

    const avatar = useMemo(() => {
        if (user?.avatar) {
            return uploadUrl + user.avatar
        }
        return defaultAvatar
    }, [user?.avatar])

    const customAvatar = (avatarPath: string) => {
        if (avatarPath) {
            return uploadUrl + avatarPath
        }
        return defaultAvatar
    }

    return { avatar, customAvatar }
}
