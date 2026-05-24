import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '@/apis/user'
import type { UserLogin } from '@en/common/user'
import md5 from 'md5'
import { useUserStore } from '@/stores/user'
import { useLogin } from '@/hooks/useLogin'

const LoginForm = () => {
    const [form] = Form.useForm<UserLogin>()
    const setUser = useUserStore((s) => s.setUser)
    const { hide } = useLogin()

    const handleLogin = async () => {
        const values = await form.validateFields()
        const res = await login({
            ...values,
            password: md5(values.password),
        })
        if (res.code === 200) {
            setUser(res.data)
            message.success('登录成功')
            hide()
        } else {
            message.error(res.message)
        }
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">欢迎回来</h1>
                <p className="text-gray-500 text-sm">请登录您的账户以继续</p>
            </div>

            <Form form={form} layout="vertical" size="large">
                <Form.Item
                    name="phone"
                    rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                    ]}
                >
                    <Input maxLength={11} prefix={<UserOutlined />} placeholder="请输入手机号" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" onPressEnter={handleLogin} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        block
                        className="h-12 text-base font-semibold"
                        onClick={handleLogin}
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default LoginForm
