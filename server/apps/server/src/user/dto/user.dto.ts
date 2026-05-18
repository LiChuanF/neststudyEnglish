import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { UserLogin, UserRegister, UserUpdate, Token } from '@en/common/user';

/**
 * ApiProperty: 登录用户 DTO
 * @description 登录用户时需要的手机号和密码
 * 
 * ApiPropertyOptional: 邮箱可选参数
 * @description 注册用户时邮箱可选，用于登录时的邮箱验证
 */
export class UserLoginDto implements UserLogin {
    @ApiProperty({ description: '手机号', example: '13000000000' })
    phone!: string;

    @ApiProperty({ description: '密码', example: '123456' })
    password!: string;
}

export class UserRegisterDto implements UserRegister {
    @ApiProperty({ description: '用户名', example: '张三' })
    name!: string;

    @ApiProperty({ description: '手机号', example: '13000000000' })
    phone!: string;

    @ApiPropertyOptional({ description: '邮箱', example: 'zhangsan@example.com' })
    email?: string | null;

    @ApiProperty({ description: '密码', example: '123456' })
    password!: string;
}

export class RefreshTokenDto implements Omit<Token, 'accessToken'> {
    @ApiProperty({ description: '刷新令牌' })
    refreshToken!: string;
}

export class UserUpdateDto implements UserUpdate {
    @ApiProperty({ description: '用户名', example: '张三' })
    name!: string;

    @ApiPropertyOptional({ description: '邮箱', example: 'zhangsan@example.com' })
    email?: string | null;

    @ApiPropertyOptional({ description: '地址', example: '北京市朝阳区' })
    address?: string | null;

    @ApiPropertyOptional({ description: '头像', example: 'https://example.com/avatar.jpg' })
    avatar?: string | null;

    @ApiPropertyOptional({ description: '签名', example: '好好学习，天天向上' })
    bio?: string | null;

    @ApiProperty({ description: '是否开启定时任务', example: false })
    isTimingTask!: boolean;

    @ApiProperty({ description: '定时任务时间', example: '08:00' })
    timingTaskTime!: string;
}
