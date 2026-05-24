import { useState, useEffect } from 'react'
import { Tabs, Empty } from 'antd'
import type { CourseList, Course } from '@en/common/course'
import { getCourseList, getMyCourse } from '@/apis/course'
import { uploadUrl } from '@/apis'
import { useLogin } from '@/hooks/useLogin'
import { useUserStore } from '@/stores/user'
import { useNavigate } from 'react-router-dom'
import Pay from './Pay'

const CoursePage = () => {
    const navigate = useNavigate()
    const user = useUserStore((s) => s.user)
    const { login } = useLogin()
    const [currentTab, setCurrentTab] = useState('list')
    const [list, setList] = useState<CourseList>([])
    const [payVisible, setPayVisible] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

    const getList = async (tab?: string) => {
        const t = tab || currentTab
        if (t === 'list') {
            const res = await getCourseList()
            setList(res.data)
        } else {
            const res = await getMyCourse()
            setList(res.data)
        }
    }

    const openPay = async (course: Course) => {
        try {
            await login()
        } catch {
            return
        }
        if (currentTab === 'list') {
            setPayVisible(true)
            setSelectedCourse(course)
        } else {
            navigate(`/courses/learn/${course.id}/${course.name}`)
        }
    }

    const imageSrc = (url: string) => uploadUrl + url

    const onTabChange = (key: string) => {
        setCurrentTab(key)
        getList(key)
    }

    useEffect(() => {
        let ignore = false
        const fetchData = async () => {
            const res = await getCourseList()
            if (!ignore) setList(res.data)
        }
        fetchData()
        return () => { ignore = true }
    }, [])

    const tabItems = [
        { key: 'list', label: '精选课程' },
        ...(user?.id ? [{ key: 'my', label: '我的课程' }] : []),
    ]

    return (
        <div className="min-h-[60vh] bg-zinc-50/80">
            <div className="w-[1200px] mx-auto px-4 pt-12 pb-24">
                <header className="mb-12 text-center">
                    <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase mb-2">Vocabulary Courses</p>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight sm:text-4xl">精选课程</h1>
                    <p className="mt-3 text-zinc-500 text-sm max-w-md mx-auto">一次购买，长期有效 · 覆盖高考、考研、四六级、托福雅思等</p>
                </header>

                <Tabs type="card" activeKey={currentTab} onChange={onTabChange} items={tabItems} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((item) => (
                        <article
                            key={item.id}
                            className="group bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-300 flex flex-col"
                        >
                            <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                                <img
                                    src={imageSrc(item.url)}
                                    alt={item.name}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur text-xs font-medium text-zinc-600 shadow-sm">
                                    词汇
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h2 className="text-base font-semibold text-zinc-900 line-clamp-1">{item.name}</h2>
                                <p className="mt-2 text-sm text-zinc-500 line-clamp-2 leading-relaxed flex-1">{item.description}</p>
                                <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                                    <span className="text-xs text-zinc-400 truncate">讲师 {item.teacher}</span>
                                    <span className="text-lg font-bold text-indigo-600 shrink-0">¥{item.price}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => openPay(item)}
                                    className="mt-4 w-full py-2.5 rounded-xl text-sm font-medium text-indigo-600 border border-indigo-200 bg-white hover:bg-indigo-50 transition-colors cursor-pointer"
                                >
                                    {currentTab === 'list' ? '购买课程' : '学习课程'}
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
                {list.length === 0 && <Empty description="暂无课程" />}
            </div>
            <Pay visible={payVisible} course={selectedCourse} onClose={() => setPayVisible(false)} />
        </div>
    )
}

export default CoursePage
