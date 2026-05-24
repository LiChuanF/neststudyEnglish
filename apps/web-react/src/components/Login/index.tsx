import { useState, useEffect } from 'react'
import { useLoginContext } from './loginContext'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ModelViewer from './ModelViewer'

export type LoginType = 'login' | 'register'

const Login = () => {
    const { isShowLogin, hideLogin } = useLoginContext()
    const [loginType, setLoginType] = useState<LoginType>('login')

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                hideLogin()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [hideLogin])

    if (!isShowLogin) return null

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-30 filter blur-sm z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-30">
                <div className="w-[1200px] h-[700px] bg-white rounded-[20px] shadow-2xl overflow-hidden flex">
                    {/* 左侧 3D 模型区域 */}
                    <ModelViewer loginType={loginType} onChangeType={setLoginType} />

                    {/* 右侧登录表单区域 */}
                    <div className="flex-1 flex flex-col justify-center px-12 py-10 bg-white">
                        {loginType === 'login' ? <LoginForm /> : <RegisterForm />}
                        <div className="mt-6 text-center">
                            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                                <span className="cursor-pointer hover:text-indigo-600 transition-colors">
                                    忘记密码？
                                </span>
                                <span className="text-gray-300">|</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
