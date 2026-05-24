import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Skeleton, Empty, message } from 'antd'
import { PlayCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import type { Word } from '@en/common/word'
import { useAudio } from '@/hooks/useAudio'
import { getWordList, saveWordMaster as saveWordMasterApi } from '@/apis/learn'
import { useUserStore } from '@/stores/user'

interface WordItem {
    word: string
    input: string
    isTrue: boolean | undefined
}

const Learn = () => {
    const { courseId, title } = useParams<{ courseId: string; title: string }>()
    const updateUserWordNumber = useUserStore((s) => s.updateUserWordNumber)
    const { playAudio } = useAudio({})

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState<Word[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isWordBlurred, setIsWordBlurred] = useState(false)
    const [wordList, setWordList] = useState<WordItem[]>([])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const currentWord = useMemo(() => list[currentIndex], [list, currentIndex])

    // 当前单词变化时更新拼写列表
    useEffect(() => {
        if (!currentWord) return
        const chars = Array.from(currentWord.word)
        setWordList(chars.map((c) => ({ word: c, input: '', isTrue: undefined })))
        inputRefs.current = new Array(chars.length).fill(null)
    }, [currentWord])

    const getWordListData = useCallback(async () => {
        if (!courseId) return
        setIsLoading(true)
        const res = await getWordList(courseId)
        setIsLoading(false)
        if (res.success) {
            setList(res.data)
        } else {
            message.error(res.message)
        }
    }, [courseId])

    useEffect(() => {
        getWordListData()
    }, [getWordListData])

    const pagePrev = () => {
        if (currentIndex <= 0) return
        setCurrentIndex(currentIndex - 1)
    }

    const pageNext = () => {
        if (wordList.some((item) => !item.isTrue)) {
            message.error('请先完成拼写')
            return
        }
        setCurrentIndex(currentIndex + 1)
    }

    const saveWordMasterHandler = async () => {
        const wordIds = list.map((item) => item.id)
        const res = await saveWordMasterApi(wordIds)
        if (res.success) {
            setCurrentIndex(0)
            getWordListData()
            updateUserWordNumber(res.data.wordNumber)
            message.success(res.message)
        } else {
            message.error(res.message)
        }
    }

    const onInput = (index: number, value: string) => {
        const newList = [...wordList]
        const current = { ...newList[index] }
        current.input = value
        current.isTrue = current.word === value
        newList[index] = current
        setWordList(newList)

        if (value && index < inputRefs.current.length - 1) {
            setTimeout(() => inputRefs.current[index + 1]?.focus(), 0)
        }
    }

    const onKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            pageNext()
            return
        }

        if (event.key === 'Backspace') {
            event.preventDefault()
            const newList = [...wordList]
            const current = { ...newList[index] }
            current.input = ''
            current.isTrue = undefined
            newList[index] = current
            setWordList(newList)
            if (index > 0) {
                setTimeout(() => inputRefs.current[index - 1]?.focus(), 0)
            }
            return
        }

        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            const current = wordList[index]
            if (current.input && index < wordList.length - 1) {
                event.preventDefault()
                const newList = [...wordList]
                const nextWord = { ...newList[index + 1] }
                nextWord.input = event.key
                nextWord.isTrue = nextWord.word === event.key
                newList[index + 1] = nextWord
                setWordList(newList)
                setTimeout(() => inputRefs.current[index + 1]?.focus(), 0)
            }
        }
    }

    return (
        <div className="min-h-[60vh] bg-zinc-50/80">
            <div className="w-[1200px] mx-auto px-4 pt-12 pb-24">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight sm:text-4xl">{title || '我的课程'}</h1>
                    <p className="mt-3 text-zinc-500 text-sm">请根据释义和翻译拼写单词</p>
                </header>

                {isLoading && <Skeleton active paragraph={{ rows: 10 }} />}

                {!isLoading && list.length === 0 && (
                    <div className="flex justify-center py-20">
                        <Empty description="暂无单词或您尚未购买该课程" />
                    </div>
                )}

                {!isLoading && list.length > 0 && (
                    <>
                        {currentIndex >= list.length ? (
                            <div className="text-center py-16 px-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                                <p className="text-zinc-600 mb-6">本组 10 个词已学完</p>
                                <Button type="primary" size="large" onClick={saveWordMasterHandler}>
                                    再练一组
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
                                    <span>第 {currentIndex + 1} / {list.length} 个</span>
                                </div>
                                <article className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                                    <div className="p-8 sm:p-10 relative">
                                        {/* 单词显示 */}
                                        <div className="flex justify-center mb-6">
                                            <div className={`transition-all duration-300 min-h-10 flex flex-col items-center text-center ${isWordBlurred ? 'blur-md select-none' : ''}`}>
                                                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 tracking-tight">
                                                    {currentWord?.word}
                                                </div>
                                                <div className="flex items-center justify-center gap-2 mt-1">
                                                    {currentWord?.phonetic && (
                                                        <span className="text-base text-zinc-500 font-mono">{currentWord.phonetic}</span>
                                                    )}
                                                    {currentWord?.word && (
                                                        <PlayCircleOutlined
                                                            className="cursor-pointer text-slate-400 hover:text-indigo-400 transition-colors"
                                                            style={{ fontSize: 18 }}
                                                            onClick={() => playAudio(currentWord.word)}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                className="absolute right-10 top-10 cursor-pointer text-slate-400 hover:text-indigo-400 transition-colors"
                                                onClick={() => setIsWordBlurred(!isWordBlurred)}
                                                title={isWordBlurred ? '点击显示单词' : '点击隐藏单词'}
                                            >
                                                {isWordBlurred ? <EyeOutlined style={{ fontSize: 18 }} /> : <EyeInvisibleOutlined style={{ fontSize: 18 }} />}
                                            </div>
                                        </div>

                                        {/* 释义 */}
                                        <div className="mb-4 rounded-lg bg-zinc-50/80 border border-zinc-100 p-4">
                                            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">释义</p>
                                            <div
                                                className="text-zinc-700 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: currentWord?.definition || '' }}
                                            />
                                        </div>

                                        {/* 翻译 */}
                                        <div className="rounded-lg bg-zinc-50/80 border border-zinc-100 p-4">
                                            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">翻译</p>
                                            <div
                                                className="text-zinc-600 leading-relaxed whitespace-pre-line"
                                                dangerouslySetInnerHTML={{ __html: currentWord?.translation || '' }}
                                            />
                                        </div>

                                        {/* 拼写练习 */}
                                        <div className="rounded-lg bg-zinc-50/80 border border-zinc-100 p-4 mt-4">
                                            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">拼写</p>
                                            <div className="flex items-center gap-2 justify-center">
                                                {wordList.map((item, index) => (
                                                    <input
                                                        key={index}
                                                        ref={(el) => { inputRefs.current[index] = el }}
                                                        maxLength={1}
                                                        type="text"
                                                        value={item.input}
                                                        onChange={(e) => onInput(index, e.target.value)}
                                                        onKeyDown={(e) => onKeyDown(index, e)}
                                                        className={`border-0 border-b-2 border-zinc-300 focus:border-indigo-500 bg-transparent outline-none w-10 text-center text-2xl font-bold ${
                                                            item.isTrue === true ? '!border-indigo-500' : item.isTrue === false ? '!border-red-500' : ''
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* 控制按钮 */}
                                        <div className="flex justify-end gap-2 mt-4">
                                            <Button type="primary" onClick={pagePrev}>上一个</Button>
                                            <Button type="primary" onClick={pageNext}>下一个</Button>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Learn
