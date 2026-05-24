import { useState, useRef, useEffect } from 'react'
import { Button, Avatar } from 'antd'
import { SendOutlined, AudioOutlined, PauseCircleOutlined } from '@ant-design/icons'
import type { ChatMessageList } from '@en/common/chat'
import { marked } from 'marked'
import '@/assets/css/deep-seek.css'
import { useVoiceToText } from '@/hooks/useVoiceToText'

interface Props {
    list?: ChatMessageList
    onSendMessage: (message: string, deepThink: boolean, webSearch: boolean) => void
}

const Bubble = ({ list = [], onSendMessage }: Props) => {
    const { isRecording, start, stop } = useVoiceToText({ lang: 'zh-CN', continuous: true })
    const [deepThink, setDeepThink] = useState(false)
    const [webSearch, setWebSearch] = useState(false)
    const [message, setMessage] = useState('')
    const chatRef = useRef<HTMLDivElement>(null)

    const sendMessage = () => {
        if (!message) return
        onSendMessage(message, deepThink, webSearch)
        setMessage('')
    }

    const parseMarkdown = (content: string) => {
        if (!content) return ''
        return marked.parse(content) as string
    }

    const startRecording = () => {
        start((result) => {
            setMessage(result)
        })
    }

    const stopRecording = () => {
        stop()
        setTimeout(() => {
            if (message) {
                onSendMessage(message, deepThink, webSearch)
                setMessage('')
            }
        }, 100)
    }

    // 监听消息列表，滚动到最底部
    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [list])

    return (
        <div className="flex-1 h-[750px] p-5 bg-purple-50 flex flex-col">
            <div className="flex-1 overflow-y-auto">
                {list.map((item, index) => (
                    <div key={index}>
                        {item.role === 'human' ? (
                            <div className="flex justify-end items-start gap-4 mt-5 mb-5 mr-5">
                                <div className="text-sm text-white max-w-[80%] rounded-lg p-2 bg-blue-500 shadow-md">
                                    {item.content}
                                </div>
                                <Avatar size={35} className="shrink-0">user</Avatar>
                            </div>
                        ) : (
                            <div className="flex justify-start items-start gap-4 mt-5 mb-5">
                                <Avatar size={35} className="shrink-0">AI</Avatar>
                                <div>
                                    {item.role === 'ai' && item.reasoning && (
                                        <div className="text-xs text-gray-500 max-w-[80%] p-2">
                                            {item.reasoning}
                                        </div>
                                    )}
                                    {item.role === 'ai' && item.content !== '' && (
                                        <div
                                            className="text-sm text-gray-700 max-w-[80%] bg-white rounded-lg mt-2 deepseek-markdown"
                                            dangerouslySetInnerHTML={{ __html: parseMarkdown(item.content) }}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={chatRef} />
            </div>

            <div className="flex p-5 border-t border-gray-200 box-border flex-col gap-3">
                {/* 功能选项 */}
                <div className="flex items-center gap-3">
                    <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs cursor-pointer transition-all border ${
                            deepThink
                                ? 'bg-purple-100 border-purple-400 text-purple-700'
                                : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200'
                        }`}
                        onClick={() => setDeepThink(!deepThink)}
                    >
                        <span>🧠</span>
                        <span>深度思考</span>
                    </div>
                    <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs cursor-pointer transition-all border ${
                            webSearch
                                ? 'bg-blue-100 border-blue-400 text-blue-700'
                                : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200'
                        }`}
                        onClick={() => setWebSearch(!webSearch)}
                    >
                        <span>🌐</span>
                        <span>联网搜索</span>
                    </div>
                </div>
                {/* 输入框 */}
                <div className="flex">
                    <textarea
                        className="flex-1 resize-none border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500"
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                sendMessage()
                            }
                        }}
                        placeholder="请输入内容"
                    />
                    <Button className="ml-2" type="primary" icon={<SendOutlined />} onClick={sendMessage} />
                    {!isRecording ? (
                        <Button className="ml-2" type="primary" icon={<AudioOutlined />} onClick={startRecording} />
                    ) : (
                        <Button className="ml-2" type="primary" icon={<PauseCircleOutlined />} onClick={stopRecording} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Bubble
