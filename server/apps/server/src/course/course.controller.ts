import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@libs/shared/auth/auth.guard';
import { CourseService } from './course.service';
import type { Request } from 'express';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get('list')
    findAll() {
        return this.courseService.findAll();
    }


    // UseGuards: 鉴权守卫，只有登录用户才能访问该接口
    // @eq: 获取用户购买的课程列表
    @UseGuards(AuthGuard)
    @Get('mycourse')
    findMy(@Req() req: Request) {
        return this.courseService.findMy(req.user.userId);
    }
}
