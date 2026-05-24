import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/layout'

const Home = lazy(() => import('@/views/Home'))
const Chat = lazy(() => import('@/views/Chat'))
const WordBook = lazy(() => import('@/views/WordBook'))
const Course = lazy(() => import('@/views/Course'))
const Learn = lazy(() => import('@/views/Course/Learn'))
const Setting = lazy(() => import('@/views/Setting'))

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
            <Route path="/chat" element={<Layout />}>
                <Route path="index" element={<Chat />} />
            </Route>
            <Route path="/word-book" element={<Layout />}>
                <Route path="index" element={<WordBook />} />
            </Route>
            <Route path="/courses" element={<Layout />}>
                <Route path="index" element={<Course />} />
                <Route path="learn/:courseId/:title" element={<Learn />} />
            </Route>
            <Route path="/setting" element={<Layout />}>
                <Route path="index" element={<Setting />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
