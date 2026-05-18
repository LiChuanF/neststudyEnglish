import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';// 引入PrismaPg适配器
import { PrismaClient } from '../generated/prisma/client';// 引入PrismaClient客户端
import { ConfigService } from '@nestjs/config';// 引入ConfigService服务

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(
        private readonly configService: ConfigService
    ) {
        const databaseUrl = configService.get('DATABASE_URL');
        const adapter = new PrismaPg({
            connectionString: databaseUrl,
        });
        super({ adapter });
    }
    getTest() {
        return 'prisma test';
    }
}
