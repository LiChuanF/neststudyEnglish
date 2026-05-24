import { io, type Socket } from 'socket.io-client'
import { socketUrl } from '@/apis'
import { useUserStore } from '@/stores/user'

let socket: Socket | null = null

export const useSocket = () => {
    //连接socket
    const connect = () => {
        const userId = useUserStore.getState().user?.id
        if (!userId) return
        if (socket) return
        socket = io(socketUrl, {
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
            query: { userId },
        })
    }

    //断开socket
    const disconnect = () => {
        if (socket) {
            socket.disconnect()
            socket.removeAllListeners()
            socket = null
        }
    }

    //获取socket
    const getSocket = (): Socket | null => {
        return socket
    }

    return { connect, disconnect, getSocket }
}
