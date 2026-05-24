import { createContext, useContext } from 'react'

interface LoginContextType {
    isShowLogin: boolean
    showLogin: () => void
    hideLogin: () => void
}

export const LoginContext = createContext<LoginContextType>({
    isShowLogin: false,
    showLogin: () => {},
    hideLogin: () => {},
})

export const useLoginContext = () => useContext(LoginContext)
