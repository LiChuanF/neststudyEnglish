import { useLocation, useNavigate } from 'react-router-dom'
import { Popover } from 'antd'
import {
    HomeOutlined,
    RobotOutlined,
    BookOutlined,
    ReadOutlined,
    SettingOutlined,
    SunOutlined,
    StarOutlined,
} from '@ant-design/icons'
import { useUserStore } from '@/stores/user'
import { useAvatar } from '@/hooks/useAvatar'
import { useLogin } from '@/hooks/useLogin'
import Profile from './Profile'

const routes = [
    { path: '/', name: '主页', icon: <HomeOutlined />, isAuth: false },
    { path: '/chat/index', name: 'AI', icon: <RobotOutlined />, isAuth: true },
    { path: '/word-book/index', name: '词库', icon: <BookOutlined />, isAuth: false },
    { path: '/courses/index', name: '课程', icon: <ReadOutlined />, isAuth: false },
    { path: '/setting/index', name: '设置', icon: <SettingOutlined />, isAuth: true },
]

const Header = () => {
    //useLocation hook返回当前的location对象，包含了当前URL的路径、查询参数等信息。它允许组件访问和响应URL的变化，从而实现动态路由和导航功能。
    const location = useLocation()
    //useNavigate hook返回一个函数，允许组件编程式地导航到不同的URL路径。通过调用这个函数并传入目标路径，组件可以实现页面跳转，而不需要用户点击链接。
    const navigate = useNavigate()
    const user = useUserStore((state) => state.user)
    const { avatar } = useAvatar()
    const { login } = useLogin()

    const isActive = (path: string) => {
        return location.pathname === path
            ? 'bg-blue-200 text-blue-700'
            : 'text-gray-500 hover:bg-blue-200 hover:text-blue-700'
    }

    const gotoPath = async (path: string) => {
        const route = routes.find((r) => r.path === path)
        if (route?.isAuth) {
            try {
                await login()
                navigate(path)
            } catch {
                // 未登录，已弹出登录框
            }
        } else {
            navigate(path)
        }
    }

    return (
        <header className="flex items-center h-20 border-b border-gray-200 justify-center sticky top-0 bg-white z-10">
            <div className="w-[1200px] mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold bg-indigo-700 text-white rounded-[10px] px-2 py-1 w-10 flex items-center justify-center h-10">
                    E
                </div>
                <div className="text-2xl font-bold">English App</div>
                {routes.map((route) => (
                    <div
                        key={route.path}
                        onClick={() => gotoPath(route.path)}
                        className={`flex items-center gap-2 cursor-pointer rounded-[10px] px-2 py-1 ${isActive(route.path)}`}
                    >
                        {route.icon}
                        <span>{route.name}</span>
                    </div>
                ))}
                <div className="flex items-center gap-2 bg-blue-200 text-blue-700 rounded-full px-2 py-1">
                    <SunOutlined />
                    <span className="font-bold text-sm">{user?.wordNumber ?? 0}</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-200 text-amber-700 rounded-full px-2 py-1">
                    <StarOutlined />
                    <span className="font-bold text-sm">{user?.dayNumber ?? 0}</span>
                </div>
                <Popover content={<Profile />} trigger="click" placement="bottomRight">
                    <div className="flex items-center gap-2 border-l cursor-pointer border-gray-200 pl-4">
                        <img className="w-10 h-10 rounded-full ml-2 mr-2" src={avatar} />
                        <span className="text-sm font-bold">{user?.name ?? '游客'}</span>
                    </div>
                </Popover>
            </div>
        </header>
    )
}

export default Header
