import {
    Controller,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
    UseGuards,
    Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserLoginDto, UserRegisterDto, RefreshTokenDto, UserUpdateDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@libs/shared/auth/auth.guard';
import type { Request } from 'express';

@ApiTags('User (用户模块)')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: '用户登录' })
    @Post('login')
    login(@Body() createUserDto: UserLoginDto) {
        return this.userService.login(createUserDto);
    }

    @ApiOperation({ summary: '用户注册' })
    @Post('register')
    register(@Body() createUserDto: UserRegisterDto) {
        return this.userService.register(createUserDto);
    }

    @ApiOperation({ summary: '刷新 Token' })
    @Post('refresh-token')
    refresh(@Body() createUserDto: RefreshTokenDto) {
        return this.userService.refresh(createUserDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: '退出登录' })
    @UseGuards(AuthGuard)
    @Post('logout')
    logout(@Req() req: Request) {
        return this.userService.logout(req.user.userId);
    }

    @ApiOperation({ summary: '上传头像' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('upload-avatar')
    //UseInterceptors 拦截器 用于拦截请求 并进行处理
    //FileInterceptor 文件拦截器 用于拦截文件请求 并进行处理
    //'file' 文件字段名 用于获取文件
    @UseInterceptors(FileInterceptor('file'))
    uploadAvatar(@UploadedFile() file: Express.Multer.File) {
        return this.userService.uploadAvatar(file);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: '更新用户信息' })
    @UseGuards(AuthGuard) //不传tolen401 传了之后payload userId name email
    @Post('update-user')
    updateUser(@Body() createUserDto: UserUpdateDto, @Req() req: Request) {
        const user = req.user;
        return this.userService.updateUser(createUserDto, user);
    }
}
