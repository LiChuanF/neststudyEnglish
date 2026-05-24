import { useState, useEffect, useRef, useCallback } from 'react'
import { useUserStore } from '@/stores/user'
import { getChatHistory } from '@/apis/chat'
import type { ChatRoleType, ChatMessageList, ChatDto, ChatMessage } from '@en/common/chat'
import { sse, CHAT_URL } from '@/apis/sse'
import Conversations from './Conversations'
import Bubble from './Bubble'

const Chat = () => {
    const user = useUserStore((s) => s.user)
    const userId = user?.id
    const [list, setList] = useState<ChatMessageList>([])
    const roleRef = useRef<ChatRoleType>('normal')

    const getRole = useCallback(async (params: ChatRoleType) => {
        roleRef.current = params
        if (!userId) {
            setList([])
            return
        }
        setList([])
        const res = await getChatHistory(userId, params)
        setList(res.data)
    }, [userId])

    // 登录用户变化时重新拉取历史
    useEffect(() => {
        if (!userId) {
            setList([])
            return
        }
        const fetchHistory = async () => {
            const res = await getChatHistory(userId, roleRef.current)
            setList(res.data)
        }
        fetchHistory()
    }, [userId])

    const sendMessage = (message: string, deepThink: boolean, webSearch: boolean) => {
        if (!userId) return
        setList((prev) => [
            ...prev,
            { role: 'human', content: message, type: 'chat' },
            { role: 'ai', content: '', reasoning: '', type: 'chat' },
        ])

        sse<ChatMessage, ChatDto>(CHAT_URL, 'POST', {
            deepThink,
            webSearch,
            role: roleRef.current,
            content: message,
            userId,
        }, (data) => {
            setList((prev) => {
                const newList = [...prev]
                const lastItem = { ...newList[newList.length - 1] }
                if (data.type === 'reasoning') {
                    lastItem.reasoning = (lastItem.reasoning || '') + data.content
                }
                if (data.type === 'chat') {
                    lastItem.content += data.content
                }
                newList[newList.length - 1] = lastItem
                return newList
            })
        })
    }

    return (
        <div className="w-[1200px] mx-auto flex mt-10">
            <Conversations onGetRole={getRole} />
            <Bubble list={list} onSendMessage={sendMessage} />
        </div>
    )
}

export default Chat
