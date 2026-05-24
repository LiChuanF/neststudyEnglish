import { useState, useEffect, useRef } from 'react'
import { Form, Input, Button, Switch, TimePicker, Card, Tag, Upload, Modal, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UserUpdate } from '@en/common/user'
import type { UploadFile } from 'antd'
import defaultAvatarImg from '@/assets/images/avatar/default-avatar.png'
import { useUserStore } from '@/stores/user'
import { uploadAvatar, updateUser } from '@/apis/user'
import { useAvatar } from '@/hooks/useAvatar'
import { useLogin } from '@/hooks/useLogin'
import dayjs from 'dayjs'

const Setting = () => {
    const { customAvatar } = useAvatar()
    const { logout } = useLogin()
    const [form] = Form.useForm<UserUpdate>()
    const user = useUserStore((s) => s.user)
    const updateUserStore = useUserStore((s) => s.updateUser)
    const [previewUrl, setPreviewUrl] = useState('')
    const avatarPathRef = useRef('')

    const init = () => {
        if (user) {
            const info: UserUpdate = {
                name: user.name,
                email: user.email,
                address: user.address,
                avatar: user.avatar,
                bio: user.bio,
                isTimingTask: user.isTimingTask,
                timingTaskTime: user.timingTaskTime,
            }
            form.setFieldsValue(info)
            avatarPathRef.current = user.avatar || ''
            setPreviewUrl(customAvatar(user.avatar || ''))
        }
    }

    useEffect(() => {
        init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onAvatarSelect = async (file: UploadFile) => {
        const formData = new FormData()
        formData.append('file', file as unknown as File)
        const res = await uploadAvatar(formData)
        if (res.success && res.data) {
            avatarPathRef.current = res.data.databaseUrl
            form.setFieldValue('avatar', res.data.databaseUrl)
            setPreviewUrl(res.data.previewUrl)
        } else {
            message.error(res.message)
        }
    }

    const onSave = async () => {
        const values = await form.validateFields()
        const data: UserUpdate = {
            ...values,
            avatar: avatarPathRef.current,
            timingTaskTime: values.timingTaskTime
                ? (typeof values.timingTaskTime === 'string' ? values.timingTaskTime : dayjs(values.timingTaskTime).format('HH:mm:ss'))
                : '',
        }
        const res = await updateUser(data)
        if (res.success && res.data) {
            updateUserStore(res.data)
            message.success('更新成功')
        } else {
            message.error(res.message)
        }
    }

    const logoutHandle = () => {
        Modal.confirm({
            title: '提示',
            content: '确定退出登录吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => logout(),
        })
    }

    return (
        <div className="mx-auto w-[1200px] px-4 py-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-xl font-extrabold text-slate-900">设置</div>
                    <div className="mt-1 text-sm text-slate-500">在这里修改你的个人信息与头像</div>
                </div>
                <div className="flex gap-2">
                    <Button onClick={init}>重置</Button>
                    <Button type="primary" onClick={onSave}>保存</Button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <Card title="头像">
                        <div className="flex items-center gap-4">
                            <img
                                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                src={previewUrl || defaultAvatarImg}
                                loading="lazy"
                            />
                            <div className="flex flex-col gap-2">
                                <Upload
                                    showUploadList={false}
                                    beforeUpload={(file) => {
                                        onAvatarSelect(file as unknown as UploadFile)
                                        return false
                                    }}
                                    accept="image/*"
                                >
                                    <Button type="primary" icon={<UploadOutlined />}>选择头像</Button>
                                </Upload>
                                <div className="text-xs text-slate-500">
                                    支持 png/jpg/webp，建议小于 2MB
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="账号" className="mt-4">
                        <div className="text-sm text-slate-600 flex items-center justify-between">
                            <span>登录状态</span>
                            <Tag color="success">已登录</Tag>
                        </div>
                    </Card>
                </div>

                <div className="col-span-2">
                    <Card title="个人信息">
                        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                            <Form.Item label="用户名" name="name" rules={[{ required: true, message: '请输入用户名' }]}>
                                <Input placeholder="请输入用户名" allowClear />
                            </Form.Item>

                            <Form.Item
                                label="邮箱"
                                name="email"
                                rules={[{
                                    validator: (_, value) => {
                                        if (value && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                                            return Promise.reject('请输入正确的邮箱')
                                        }
                                        return Promise.resolve()
                                    }
                                }]}
                            >
                                <Input placeholder="请输入邮箱" allowClear />
                            </Form.Item>

                            <Form.Item label="定时任务" name="isTimingTask" valuePropName="checked">
                                <Switch />
                            </Form.Item>

                            <Form.Item label="定时任务时间" name="timingTaskTime">
                                <div>
                                    <TimePicker format="HH:mm:ss" placeholder="请选择定时任务时间"
                                        onChange={(_, timeString) => form.setFieldValue('timingTaskTime', timeString)}
                                    />
                                    <div className="text-xs text-slate-500 mt-3">
                                        tips:只有填写邮箱并且开启定时任务，才能收到每日打卡提醒
                                    </div>
                                </div>
                            </Form.Item>

                            <Form.Item label="地址" name="address">
                                <Input placeholder="请输入地址" allowClear />
                            </Form.Item>

                            <Form.Item label="签名" name="bio">
                                <Input.TextArea placeholder="写点什么介绍一下自己" rows={4} maxLength={120} showCount />
                            </Form.Item>
                        </Form>
                    </Card>

                    <Card title="危险操作" className="mt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-bold text-slate-900">退出登录</div>
                                <div className="text-sm text-slate-500">清除本地登录状态</div>
                            </div>
                            <Button danger onClick={logoutHandle}>退出</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Setting
