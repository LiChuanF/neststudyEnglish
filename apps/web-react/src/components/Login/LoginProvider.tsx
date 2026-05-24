import { useState, useCallback, type ReactNode } from 'react'
import { LoginContext } from './loginContext'

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [isShowLogin, setIsShowLogin] = useState(false)
    const showLogin = useCallback(() => setIsShowLogin(true), [])
    const hideLogin = useCallback(() => setIsShowLogin(false), [])
    return (
        <LoginContext.Provider value={{ isShowLogin, showLogin, hideLogin }}>
            {children}
        </LoginContext.Provider>
    )
}
