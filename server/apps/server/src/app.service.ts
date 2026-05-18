import { Injectable } from '@nestjs/common';
import { PrismaService, SharedService } from '@libs/shared';

@Injectable()
export class AppService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly sharedService: SharedService,
    ) {}
    getHello(): string {
        return this.prisma.getTest();
    }
    getTest(): string {
        return this.sharedService.thisTest();
    }
}
