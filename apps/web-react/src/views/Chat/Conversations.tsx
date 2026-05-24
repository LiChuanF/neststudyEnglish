import { useState, useEffect } from 'react'
import type { ChatModeList, ChatMode, ChatRoleType } from '@en/common/chat'
import { getChatMode } from '@/apis/chat'

interface Props {
    onGetRole: (role: ChatRoleType) => void
}

const Conversations = ({ onGetRole }: Props) => {
    const [chatMode, setChatMode] = useState<ChatModeList>([])
    const [active, setActive] = useState<string | null>(null)

    const changeActive = (value: ChatMode) => {
        setActive(value.id)
        onGetRole(value.role)
    }

    useEffect(() => {
        const getChatModeList = async () => {
            const res = await getChatMode()
            setChatMode(res.data)
            const firstItem = res.data[0]
            if (firstItem) {
                setActive(firstItem.id)
                onGetRole(firstItem.role)
            }
        }
        getChatModeList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="p-5 rounded-[5px] w-[256px] bg-purple-50 border-r border-gray-200">
            {chatMode.map((value) => (
                <div
                    key={value.id}
                    onClick={() => changeActive(value)}
                    className={`rounded-[5px] p-2 transition-all duration-300 ${active === value.id ? 'bg-purple-300' : ''}`}
                >
                    <div className="text-sm cursor-pointer p-2 px-4 text-gray-700">
                        {value.label}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Conversations
