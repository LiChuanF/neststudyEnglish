import { Injectable } from '@nestjs/common';
import { PrismaService, ResponseService } from '@libs/shared';
import { TradeStatus } from '@libs/shared/generated/prisma/enums';

@Injectable()
export class CourseService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly responseService: ResponseService,
    ) {

    }
    async findAll() {
        const courses = await this.prismaService.course.findMany()
        const list = courses.map(item => ({
            ...item,
            price: Number(item.price).toFixed(2)
        }));
        return this.responseService.success(list)
    }

    async findMy(userId: string) {
        const courseRecords = await this.prismaService.courseRecord.findMany({
            where: {
                userId: userId,
                paymentRecord: {
                    tradeStatus: TradeStatus.TRADE_SUCCESS
                }
            },
            include: {
                course: true
            }
        });
        const list = courseRecords.map(item => ({
            ...item.course,
            price: Number(item.course.price).toFixed(2)
        }));
        return this.responseService.success(list);
    }

}
