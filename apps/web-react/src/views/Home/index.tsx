import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLogin } from '@/hooks/useLogin'
import Hologram from './Hologram'

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { suffix: '+', label: '累计学员', target: 1000000 },
    { suffix: '+', label: '精品课程', target: 500 },
    { suffix: '%', label: '学员满意度', target: 98 },
    { suffix: '+', label: '学习时长(小时)', target: 5000000 },
]

const abouts = [
    { icon: '🖼️', title: 'AI情境学习', content: '沉浸式场景模拟，让你在真实语境中自然习得英语，告别枯燥的死记硬背。' },
    { icon: '🧠', title: '智能对话练习', content: 'AI 实时纠错反馈，个性化对话训练，24小时随时练习口语表达。' },
    { icon: '🎤', title: '科学词汇记忆', content: '基于艾宾浩斯遗忘曲线，智能安排复习计划，让单词真正记住。' },
]

const Home = () => {
    const { login } = useLogin()
    const statRefs = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        console.log('执行了');

        //数字滚动动画
        statRefs.current.forEach((el, index) => {
            if (!el) return
            const item = stats[index]
            gsap.fromTo(el, { textContent: '0' }, {
                textContent: item.target,
                duration: 1,
                ease: 'power2.inOut',
                snap: { textContent: 1 },
                onUpdate() {
                    el.textContent = Math.floor(Number(el.textContent) || 0).toLocaleString()
                },
            })
        })

        //卡片动画
        const cards = gsap.utils.toArray('.about-card') as HTMLElement[]
        cards.forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 40, scale: 0.98 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.5, delay: index * 0.08, ease: 'power2.out',
                    scrollTrigger: { trigger: '.cards-container', start: 'top 75%' },
                }
            )
        })

        //文字动画
        gsap.fromTo('.text-why', { opacity: 0, y: 60 }, { opacity: 1, y: 0 })
        gsap.fromTo('.text-why-content', { opacity: 0, y: 60 }, { opacity: 1, y: 0 })

        gsap.fromTo('.text-core', { opacity: 0, y: 60 }, {
            opacity: 1, y: 0,
            scrollTrigger: { trigger: '.text-core', start: 'top 70%' },
        })
        gsap.fromTo('.core-title', { opacity: 0, y: 60 }, {
            opacity: 1, y: 0,
            scrollTrigger: { trigger: '.core-title', start: 'top 70%' },
        })
        gsap.fromTo('.core-content', { opacity: 0, y: 60 }, {
            opacity: 1, y: 0,
            scrollTrigger: { trigger: '.core-content', start: 'top 70%' },
        })

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [])

    const showLogin = () => {
        login().catch(() => { })
    }

    return (
        <div className="w-[1200px] mx-auto mt-10 pb-30">
            {/* 背景区域 */}
            <div className="relative flex justify-between rounded-[20px] p-9">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900/70 rounded-[20px]" />
                <div className="relative z-[8] p-8">
                    <span className="text-white text-xl bg-indigo-500/20 rounded-[100px] px-4 py-2">坚持5天打卡学习</span>
                    <div className="text-2xl font-bold pt-8 text-indigo-500">通过跟AI对话，提高你的英语水平</div>
                    <div className="text-xl font-bold pt-5 text-gray-300">超1000000学员的选择，提升您的英语能力</div>
                    <div className="flex items-center gap-2 pt-10">
                        <button onClick={showLogin} className="bg-indigo-700 text-white rounded-[100px] px-4 py-2 cursor-pointer text-sm block w-30 h-10">
                            立即学习
                        </button>
                        <button className="bg-indigo-700 text-white rounded-[100px] px-4 py-2 cursor-pointer text-sm block w-30 h-10">
                            查看课程
                        </button>
                    </div>
                </div>
                <div className="relative z-[8] p-8">
                    <Hologram />
                </div>
            </div>

            {/* 描述区域 */}
            <div className="rounded-[20px] p-10 text-center">
                <div className="text-2xl text-why font-bold text-gray-800">为什么选择我们?</div>
                <div className="text-xl text-why-content font-bold text-gray-600 mt-4">
                    我们经过科学的验证，AI学习英语的效果比传统学习方式更好，更高效。
                </div>
            </div>

            {/* 数据统计区域 */}
            <div className="mt-16 py-12 flex items-center justify-between">
                {stats.map((item, index) => (
                    <div key={item.label} className="flex-1 text-center flex items-center">
                        <div className="flex-1">
                            <div className="flex items-baseline justify-center gap-1">
                                <span
                                    ref={(el) => { statRefs.current[index] = el }}
                                    className="text-4xl font-bold text-gray-800 stat-number"
                                >
                                    0
                                </span>
                                <span className="text-2xl font-bold text-indigo-500">{item.suffix}</span>
                            </div>
                            <div className="text-gray-500 mt-2">{item.label}</div>
                        </div>
                        {index < stats.length - 1 && <div className="w-px h-16 bg-gray-200" />}
                    </div>
                ))}
            </div>

            {/* 核心优势 */}
            <div className="relative text-center py-8 mb-6">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl" />
                <div className="relative z-10">
                    <span className="inline-block text-core px-4 py-1.5 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full mb-4">
                        ✨ 核心优势
                    </span>
                    <div className="text-3xl font-bold core-title bg-gradient-to-r from-gray-800 via-indigo-700 to-indigo-500 bg-clip-text text-transparent">
                        重新定义英语学习方式
                    </div>
                    <div className="text-base text-gray-500 mt-4 mx-auto core-content leading-relaxed">
                        融合前沿 AI 技术与语言学研究，打造沉浸式学习体验，让每一分钟的学习都更有价值
                    </div>
                </div>
            </div>

            {/* 特色卡片 */}
            <div className="grid cards-container grid-cols-3 gap-6" style={{ perspective: 1000 }}>
                {abouts.map((item, index) => (
                    <div
                        key={item.title}
                        className="about-card group relative overflow-hidden rounded-[24px] p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-100 rounded-full blur-2xl group-hover:scale-150 group-hover:bg-indigo-200 transition-all duration-700" />
                        <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-indigo-50 rounded-full" />
                        <div className="relative z-10 w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-indigo-200 transition-all duration-300">
                            {item.icon}
                        </div>
                        <div className="relative z-10">
                            <div className="text-xl font-bold text-gray-800 mb-3">{item.title}</div>
                            <div className="text-sm text-gray-500 leading-relaxed">{item.content}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
