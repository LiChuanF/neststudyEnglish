// Suspense: 管理异步操作（如数据加载、代码分割）的组件，它允许你在等待异步依赖时展示降级 UI（如加载指示器），从而提升用户体验。以下是其核心作用及使用场景：
import { Suspense } from 'react'
// Outlet: 是 React Router v6 中的一个组件，用于在父路由组件中渲染匹配的子路由组件。它充当了一个占位符，告诉 React Router 在该位置渲染当前匹配的子路由组件。
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import Header from './Header'

const Layout = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<div className="flex justify-center items-center h-[60vh]"><Spin size="large" /></div>}>
                <Outlet />
            </Suspense>
        </>
    )
}

export default Layout
