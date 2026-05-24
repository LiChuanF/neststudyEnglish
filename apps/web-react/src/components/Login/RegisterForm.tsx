import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { register } from '@/apis/user'
import type { UserRegister } from '@en/common/user'
import md5 from 'md5'
import { useUserStore } from '@/stores/user'
import { useLogin } from '@/hooks/useLogin'

const RegisterForm = () => {
    const [form] = Form.useForm<UserRegister>()
    const setUser = useUserStore((s) => s.setUser)
    const { hide } = useLogin()

    const handleRegister = async () => {
        const values = await form.validateFields()
        const res = await register({
            ...values,
            password: md5(values.password),
        })
        if (res.code === 200) {
            setUser(res.data)
            message.success('注册成功')
            hide()
        } else {
            message.error(res.message)
        }
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">欢迎注册</h1>
                <p className="text-gray-500 text-sm">请填写以下信息以完成注册</p>
            </div>

            <Form form={form} layout="vertical" size="large">
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: '请输入用户名' },
                        { min: 2, max: 10, message: '用户名长度为2-10位' },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                    ]}
                >
                    <Input maxLength={11} prefix={<UserOutlined />} placeholder="请输入手机号" />
                </Form.Item>

                <Form.Item name="email">
                    <Input prefix={<UserOutlined />} placeholder="请输入邮箱(可选)" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: '请输入密码' },
                        { min: 6, max: 16, message: '密码长度为6-16位' },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        block
                        className="h-12 text-base font-semibold"
                        onClick={handleRegister}
                    >
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default RegisterForm
