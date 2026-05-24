import { useState, useEffect, useRef, useCallback } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { message } from 'antd'
import type { Word } from '@en/common/word'
import { getWordBookList } from '@/apis/word-book'

const Search = () => {
    const [isShow, setIsShow] = useState(false)
    const [search, setSearch] = useState('')
    const [wordList, setWordList] = useState<Word[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const getList = useCallback(async (word: string) => {
        if (!word) {
            setWordList([])
            return
        }
        const res = await getWordBookList({ word, page: 1, pageSize: 20 })
        if (res.success) {
            setWordList(res.data.list)
        }
    }, [])

    const handleSearch = (value: string) => {
        setSearch(value)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            getList(value)
        }, 500)
    }

    const copyWord = (word: string) => {
        try {
            navigator.clipboard.writeText(word)
            message.success('复制成功')
        } catch {
            message.error('复制失败')
        }
    }

    const close = useCallback(() => {
        setIsShow(false)
        setSearch('')
        setWordList([])
        document.body.style.overflow = 'auto'
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'a' && e.ctrlKey) {
                e.preventDefault()
                setIsShow(true)
                document.body.style.overflow = 'hidden'
            }
            if (e.key === 'Escape') {
                close()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [close])

    useEffect(() => {
        if (isShow && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isShow])

    if (!isShow) return null

    return (
        <>
            <div className="fixed inset-0 w-full h-full z-40 bg-black opacity-30 blur-sm" />
            <div className="fixed inset-0 shadow-lg z-50 p-30 pt-20">
                <div
                    className={`flex items-center gap-2 shadow-lg w-1/2 mx-auto p-3 bg-white ${wordList.length > 0 ? 'rounded-tr-[10px] rounded-tl-[10px]' : 'rounded-[10px]'}`}
                >
                    <SearchOutlined style={{ fontSize: 20 }} />
                    <input
                        ref={inputRef}
                        placeholder="搜索"
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full h-full text-sm border-none rounded-lg p-2 focus:outline-none"
                    />
                </div>
                {wordList.length > 0 && (
                    <div className="w-1/2 mx-auto max-h-[500px] border-t border-gray-200 overflow-y-auto">
                        {wordList.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => copyWord(item.word)}
                                className="bg-white hover:bg-blue-50 text-gray-800 p-4 cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="text-sm font-semibold text-blue-600 mb-1">{item.word}</div>
                                <div
                                    className="text-sm text-gray-700 mb-1 overflow-hidden line-clamp-2"
                                    dangerouslySetInnerHTML={{ __html: item.translation || '' }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Search
