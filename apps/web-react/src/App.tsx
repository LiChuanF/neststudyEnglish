import { useEffect } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { ConfigProvider, App as AntApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import AppRoutes from './router'
import { LoginProvider } from './components/Login/LoginProvider'
import Search from './components/Search'
import Login from './components/Login'
import { setNavigate } from './apis'
import { useUserStore } from './stores/user'
import { useSocket } from './hooks/useSocket'
import { Tracker } from '@en/tracker'

const tracker = new Tracker({
    baseUrl: '/api/v1',
    uv: { api: '/tracker/uv', updateApi: '/tracker/update-uv' },
    pv: { api: '/tracker/pv' },
    event: { api: '/tracker/event' },
    error: { api: '/tracker/error' },
    performance: { api: '/tracker/performance' },
})

// 在Router内部的组件，可以使用所有router hooks
const AppInner = () => {
    const navigate = useNavigate()
    const userId = useUserStore((s) => s.user?.id)
    const { connect, disconnect } = useSocket()

    // 注入navigate给api层使用（token过期跳转首页）
    useEffect(() => {
        setNavigate(navigate)
    }, [navigate])

    // 用户登录/退出时管理tracker和socket
    useEffect(() => {
        if (userId) {
            tracker.setUserId(userId)
            connect()
        } else {
            disconnect()
        }
    }, [userId, connect, disconnect])

    return (
        <>
            <AppRoutes />
            <Search />
            <Login />
        </>
    )
}

function App() {
    return (
        // 全局配置antd组件库的中文语言
        <ConfigProvider locale={zhCN}>
            <AntApp>
                <BrowserRouter>
                    <LoginProvider>
                        <AppInner />
                    </LoginProvider>
                </BrowserRouter>
            </AntApp>
        </ConfigProvider>
    )
}

export default App
