import { Injectable } from '@nestjs/common';
import { PrismaService, ResponseService } from '@libs/shared';
import type { UserLogin, UserRegister, Token, UserUpdate } from '@en/common/user'
import type { Prisma } from '@libs/shared/generated/prisma/client';
import { AuthService } from '../auth/auth.service';
import { userSelect, updateUserSelect } from './user.select';
import { MinioService } from '@libs/shared/minio/minio.service';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly response: ResponseService,
        private readonly authService: AuthService,
        private readonly minioService: MinioService,
        private readonly configService: ConfigService,
    ) { }

    //登录
    async login(createUserDto: UserLogin) {
        // 1. 判断phone是否存在
        const user = await this.prisma.user.findUnique({
            where: {
                phone: createUserDto.phone //查询手机号是否存在
            }
        })
        if (!user) {
            return this.response.error(null, '手机号不存在')
        }
        // 2. 判断密码是否正确
        if (createUserDto.password !== user.password) {
            return this.response.error(null, '密码错误')
        }
        // 3. 查询用户信息
        const updateUser = await this.prisma.user.update({
            where: {
                id: user.id //查询用户是否存在
            },
            data: {
                lastLoginAt: new Date(), // 最后登录时间
            },
            select: userSelect // 返回用户信息
        })
        console.log(updateUser);

        const token = await this.authService.issueToken({ userId: updateUser.id, name: updateUser.name, email: updateUser.email });
        return this.response.success({ ...updateUser, token })
    }
    //注册
    async register(createUserDto: UserRegister) {
        const data: Prisma.UserCreateInput = {
            name: createUserDto.name,
            phone: createUserDto.phone,
            password: createUserDto.password,
            lastLoginAt: new Date(), // 最后登录时间
        }
        // name email phone password
        // 1. phone存在就返回错误
        const user = await this.prisma.user.findUnique({
            where: {
                phone: createUserDto.phone //查询手机号是否存在
            }
        })
        if (user) {
            return this.response.error(null, '手机号已存在')
        }
        // 2. email存在就返回错误
        if (createUserDto.email) {
            const emailUser = await this.prisma.user.findUnique({
                where: {
                    email: createUserDto.email //查询邮箱是否存在
                }
            })
            if (emailUser) {
                return this.response.error(null, '邮箱已存在')
            }
            data.email = createUserDto.email
        }
        // 3. 创建用户 默认把他所有的值全部都返回，排除密码 
        const newUser = await this.prisma.user.create({
            data,
            select: userSelect // 返回用户信息
        })
        const token = await this.authService.issueToken({ userId: newUser.id, name: newUser.name, email: newUser.email });
        return this.response.success({ ...newUser, token })
    }

    //刷新token（Refresh Token Rotation + 重放检测）
    async refresh(createUserDto: Omit<Token, 'accessToken'>) {
        const result = await this.authService.rotateRefreshToken(createUserDto.refreshToken);

        if (!result.ok) {
            if (result.reason === 'reuse') {
                return this.response.error(null, '检测到异常登录，请重新登录');
            }
            return this.response.error(null, 'refreshToken已过期或无效');
        }

        const user = await this.prisma.user.findUnique({
            where: { id: result.userId },
        });
        if (!user) {
            await this.authService.revokeRefreshToken(result.userId);
            return this.response.error(null, '用户不存在');
        }

        return this.response.success(result.token);
    }

    //登出：吊销 Redis 中的 refresh jti
    async logout(userId: string) {
        await this.authService.revokeRefreshToken(userId);
        return this.response.success(null, '已退出登录');
    }

    //上传头像
    async uploadAvatar(file: Express.Multer.File) {
        console.log(file);

        if (!file) {
            return this.response.error(null, '文件不存在');
        }
        if (file.size > 1024 * 1024 * 5) {
            return this.response.error(null, '文件大小不能超过5MB');
        }
        //获取minio客户端
        const client = this.minioService.getClient();
        //获取bucket桶名
        const bucket = this.minioService.getBucket();
        //资源的名称
        const fileName = `${Date.now()}-${file.originalname}`;
        //上传资源到minio
        await client.putObject(bucket, fileName, file.buffer, file.size, {
            "Content-Type": file.mimetype
        })
        //返回文件url
        const isHttps = !!Number(this.configService.get('MINIO_USE_SSL')) //是否启用SSL
        const baseUrl = isHttps ? 'https' : 'http' //前缀http
        const port = this.configService.get<string>('MINIO_PORT')! //端口9000
        const databaseUrl = `/${bucket}/${fileName}`//数据库url /avatar/1234567890-xiaomansdas.jpg
        const previewUrl = `${baseUrl}://${this.configService.get('MINIO_ENDPOINT')}:${port}${databaseUrl}`
        //previewUrl->http://192.168.2.100:9000/avatar/1234567890-xiaomansdas.jpg
        //databaseUrl->/avatar/1234567890-xiaomansdas.jpg
        return this.response.success({
            previewUrl,
            databaseUrl,
        });
    }

    //更新用户信息
    //更新用户信息
    async updateUser(createUserDto: UserUpdate, user: Request['user']) {
        const updatedUser = await this.prisma.user.update({
            where: {
                id: user.userId,
            },
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                address: createUserDto.address,
                avatar: createUserDto.avatar,
                bio: createUserDto.bio,
                isTimingTask: createUserDto.isTimingTask,
                timingTaskTime: createUserDto.timingTaskTime,
            },
            select: updateUserSelect
        });
        return this.response.success(updatedUser);
    }
}
