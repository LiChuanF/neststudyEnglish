import { useState, useEffect, useRef, useCallback } from 'react'
import { message } from 'antd'
import type { Course } from '@en/common/course'
import type { CreatePayDto } from '@en/common/pay'
import { createPay, queryPay } from '@/apis/pay'
import { uploadUrl } from '@/apis'
import { useSocket } from '@/hooks/useSocket'

interface Props {
    visible: boolean
    course: Course | null
    onClose: () => void
}

const Pay = ({ visible, course, onClose }: Props) => {
    const { getSocket } = useSocket()
    const [isPay, setIsPay] = useState(false)
    const [timeExpire, setTimeExpire] = useState(0)
    const [countdown, setCountdown] = useState('')
    const outTradeNoRef = useRef('')
    const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const stopPolling = useCallback(() => {
        if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current)
            pollTimerRef.current = null
        }
        if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current)
            countdownTimerRef.current = null
        }
    }, [])

    const close = useCallback(() => {
        stopPolling()
        setTimeExpire(0)
        setIsPay(false)
        setCountdown('')
        outTradeNoRef.current = ''
        onClose()
    }, [onClose, stopPolling])

    const handlePaySuccess = useCallback(() => {
        stopPolling()
        message.success({ content: '支付成功', duration: 10 })
        close()
    }, [stopPolling, close])

    const startPolling = useCallback(() => {
        stopPolling()
        pollTimerRef.current = setInterval(async () => {
            if (!outTradeNoRef.current) return
            try {
                const res = await queryPay({ outTradeNo: outTradeNoRef.current })
                if (res.code === 200 && res.data?.paid) {
                    handlePaySuccess()
                }
            } catch {
                // 网络异常静默
            }
        }, 3000)
    }, [stopPolling, handlePaySuccess])

    // 倒计时
    useEffect(() => {
        if (timeExpire <= 0) {
            setCountdown('')
            return
        }
        const updateCountdown = () => {
            const now = Date.now()
            const diff = timeExpire - now
            if (diff <= 0) {
                stopPolling()
                message.error('支付超时，请重新支付')
                setTimeExpire(0)
                setIsPay(false)
                outTradeNoRef.current = ''
                setCountdown('')
                return
            }
            const h = String(Math.floor(diff / 3600000)).padStart(2, '0')
            const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
            const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
            setCountdown(`${h}:${m}:${s}`)
        }
        updateCountdown()
        countdownTimerRef.current = setInterval(updateCountdown, 1000)
        return () => {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current)
        }
    }, [timeExpire, stopPolling])

    // socket 监听
    useEffect(() => {
        const socket = getSocket()
        if (visible) {
            socket?.on('paymentSuccess', handlePaySuccess)
        } else {
            socket?.off('paymentSuccess', handlePaySuccess)
            stopPolling()
        }
        return () => {
            socket?.off('paymentSuccess', handlePaySuccess)
        }
    }, [visible, getSocket, handlePaySuccess, stopPolling])

    // 清理
    useEffect(() => {
        return () => {
            stopPolling()
            getSocket()?.off('paymentSuccess')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const imageSrc = (url: string) => uploadUrl + url

    const onConfirm = async () => {
        const body: CreatePayDto = {
            subject: course?.name || '',
            body: course?.description || '',
            total_amount: course?.price || '',
            courseId: course?.id || '',
        }
        const res = await createPay(body)
        if (res.code === 200) {
            setIsPay(true)
            outTradeNoRef.current = res.data.outTradeNo
            window.open(res.data.payUrl, '_blank')
            setTimeExpire(res.data.timeExpire)
            startPolling()
        } else {
            message.error(res.message)
            setIsPay(false)
        }
    }

    if (!visible) return null

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm" onClick={close} />
                <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl shadow-indigo-500/10 border border-zinc-100 overflow-hidden">
                    <div className="px-6 pt-6 pb-4 border-b border-zinc-100">
                        <h2 className="text-lg font-semibold text-zinc-900">确认支付</h2>
                        <p className="mt-1 text-sm text-zinc-500">请核对课程信息后完成支付</p>
                    </div>

                    {course ? (
                        <div className="p-6 space-y-4">
                            <div className="flex gap-4 rounded-xl bg-zinc-50/80 p-4">
                                <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-zinc-200">
                                    <img src={imageSrc(course.url)} alt={course.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-medium text-zinc-900 line-clamp-2">{course.name}</h3>
                                    <p className="mt-1 text-xs text-zinc-500">讲师 {course.teacher}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-indigo-50/50 px-4 py-3">
                                <span className="text-sm text-zinc-600">支付金额</span>
                                <span className="text-xl font-bold text-indigo-600">¥{course.price}</span>
                            </div>
                            {countdown && (
                                <div className="flex flex-col items-center rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3">
                                    <span className="text-sm text-zinc-500">支付剩余时间</span>
                                    <span className="text-lg font-bold text-amber-600 mt-1">{countdown}</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-6 text-center text-sm text-zinc-400">暂无课程信息</div>
                    )}

                    <div className="flex gap-3 px-6 pb-6 pt-2">
                        <button
                            type="button"
                            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-zinc-600 border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors cursor-pointer"
                            onClick={close}
                        >
                            取消
                        </button>
                        <button
                            type="button"
                            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            disabled={isPay}
                            onClick={onConfirm}
                        >
                            {isPay ? '支付中...' : '确认支付'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pay
