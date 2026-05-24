import { useState, useCallback, useRef } from 'react'

export interface VoiceOptions {
    lang?: string
    continuous?: boolean
    interimResults?: boolean
    maxAlternatives?: number
}

type SpeechRecognitionType = any

let instance: SpeechRecognitionType | null = null

const getInstance = (options: VoiceOptions): SpeechRecognitionType | null => {
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognitionCtor) {
        return null
    }
    if (!instance) {
        const { lang = 'zh-CN', continuous = false, interimResults = false, maxAlternatives = 1 } = options
        instance = new SpeechRecognitionCtor() as SpeechRecognitionType
        instance.lang = lang
        instance.continuous = continuous
        instance.interimResults = interimResults
        instance.maxAlternatives = maxAlternatives
    }
    return instance
}

export const useVoiceToText = (options: VoiceOptions = {}) => {
    const [isRecording, setIsRecording] = useState(false)
    const recognitionRef = useRef<SpeechRecognitionType | null>(null)

    if (!recognitionRef.current) {
        recognitionRef.current = getInstance(options)
        if (recognitionRef.current) {
            recognitionRef.current.onend = () => setIsRecording(false)
        }
    }

    const start = useCallback((callback?: (result: string) => void) => {
        const recognition = recognitionRef.current
        if (!recognition) return
        setIsRecording(true)
        recognition.start()
        recognition.onresult = (event: any) => {
            let fullText = ''
            for (let i = 0; i < event.results.length; i++) {
                const result = event.results[i]
                if (result?.[0]) {
                    fullText += result[0].transcript
                }
            }
            callback?.(fullText)
        }
    }, [])

    const stop = useCallback(() => {
        const recognition = recognitionRef.current
        if (!recognition) return
        setIsRecording(false)
        recognition.stop()
    }, [])

    return { isRecording, start, stop }
}
