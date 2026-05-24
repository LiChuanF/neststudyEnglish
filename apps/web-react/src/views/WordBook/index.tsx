import { useState, useEffect } from 'react'
import { Input, Checkbox, Button, Pagination, Tag } from 'antd'
import { ReadOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { getWordBookList } from '@/apis/word-book'
import type { WordQuery, WordList } from '@en/common/word'
import { useAudio } from '@/hooks/useAudio'

const WordBook = () => {
    const { playAudio } = useAudio({})
    const [total, setTotal] = useState(0)
    const [list, setList] = useState<WordList['list']>([])
    const [query, setQuery] = useState<WordQuery>({
        page: 1,
        pageSize: 12,
        word: '',
        gk: false, zk: false, gre: false, toefl: false,
        ielts: false, cet6: false, cet4: false, ky: false,
    })

    const getList = async (q?: WordQuery) => {
        const params = q || query
        const res = await getWordBookList(params)
        if (res.success) {
            setTotal(res.data.total)
            setList(res.data.list)
        }
    }

    const searchWord = () => {
        const newQuery = { ...query, page: 1 }
        setQuery(newQuery)
        getList(newQuery)
    }

    const onPageChange = (page: number) => {
        const newQuery = { ...query, page }
        setQuery(newQuery)
        getList(newQuery)
    }

    const updateFilter = (key: keyof WordQuery, value: boolean) => {
        const newQuery = { ...query, [key]: value, page: 1 }
        setQuery(newQuery)
        getList(newQuery)
    }

    useEffect(() => {
        getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const examTags: { key: keyof WordQuery; label: string }[] = [
        { key: 'gk', label: '高考' },
        { key: 'zk', label: '中考' },
        { key: 'gre', label: 'GRE' },
        { key: 'toefl', label: 'TOEFL' },
        { key: 'ielts', label: 'IELTS' },
        { key: 'cet6', label: '六级' },
        { key: 'cet4', label: '四级' },
        { key: 'ky', label: '考研' },
    ]

    return (
        <div className="w-[1200px] mx-auto mt-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[20px] p-20 shadow-lg">
            <div className="h-20">
                <div className="flex items-center gap-2">
                    <ReadOutlined style={{ color: '#2563EB', fontSize: 20 }} />
                    <span className="text-2xl font-bold text-gray-800">词库列表</span>
                </div>
                <div className="text-sm text-gray-600">
                    词典来源：牛津、柯林斯、BNC、FRQ、高考、中考、GRE、TOEFL、IELTS、大学英语六级、大学英语四级、考研
                </div>
            </div>
            <div className="flex items-center mb-10 gap-2">
                <Input
                    className="mr-4 max-w-xs"
                    value={query.word}
                    onChange={(e) => setQuery({ ...query, word: e.target.value })}
                    onPressEnter={searchWord}
                    placeholder="请输入单词"
                />
                {examTags.map(({ key, label }) => (
                    <Checkbox
                        key={key}
                        checked={!!query[key]}
                        onChange={(e) => updateFilter(key, e.target.checked)}
                    >
                        {label}
                    </Checkbox>
                ))}
                <Button type="primary" className="ml-4" onClick={searchWord}>搜索</Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {list.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white hover:bg-blue-50 border border-blue-200 text-gray-800 rounded-[10px] p-4 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md h-[220px]"
                    >
                        <div className="text-sm font-semibold text-blue-600 mb-1">{item.word}</div>
                        <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                            {item.phonetic}
                            <PlayCircleOutlined
                                style={{ fontSize: 18, color: '#2563EB', cursor: 'pointer' }}
                                onClick={() => playAudio(item.word)}
                            />
                        </div>
                        <div className="text-sm text-gray-700 mb-1 overflow-hidden line-clamp-2">{item.definition}</div>
                        <div
                            className="text-sm text-gray-600 mb-1 overflow-hidden line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: item.translation || '' }}
                        />
                        <div className="text-sm text-gray-600 mt-3 flex items-center gap-2 flex-wrap">
                            {item.gk && <Tag color="blue">高考</Tag>}
                            {item.zk && <Tag color="blue">中考</Tag>}
                            {item.gre && <Tag color="blue">GRE</Tag>}
                            {item.toefl && <Tag color="blue">TOEFL</Tag>}
                            {item.ielts && <Tag color="blue">IELTS</Tag>}
                            {item.cet6 && <Tag color="blue">六级</Tag>}
                            {item.cet4 && <Tag color="blue">四级</Tag>}
                            {item.ky && <Tag color="blue">考研</Tag>}
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                className="mt-10"
                current={query.page}
                pageSize={query.pageSize}
                total={total}
                onChange={onPageChange}
                showSizeChanger={false}
            />
        </div>
    )
}

export default WordBook
