import { Module, Global } from '@nestjs/common';
import { SharedService } from './shared.service';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseModule } from './response/response.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule } from './minio/minio.module';
import { PayModule } from './pay/pay.module';
import { EmailModule } from './email/email.module';
import { BullModule } from '@nestjs/bullmq';

//导出Prisma的Service和Module
@Global() // 全局模块，可以在任何地方使用
@Module({
    //providers: 表示提供者，用于提供服务
    providers: [SharedService],
    //exports: 表示导出者，用于导出服务
    exports: [SharedService, PrismaModule, ResponseModule, JwtModule, ConfigModule, MinioModule, PayModule, EmailModule],
    //imports: 表示导入者，用于导入模块
    imports: [
        PrismaModule,
        ResponseModule,
        ConfigModule.forRoot({
            envFilePath: '.env', // 加载环境变量文件
            isGlobal: true, // 全局模块，可以在任何地方使用
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('SECRET_KEY'),
                signOptions: { expiresIn: '1h' }, // 过期时间
            }),
        }),
        MinioModule,
        PayModule,
        EmailModule,
        BullModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                connection: {
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                }
            }),
        }),
    ],
})
export class SharedModule { }
