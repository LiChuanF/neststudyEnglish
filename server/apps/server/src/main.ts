/** NestJS HTTP 应用入口：创建应用、挂全局中间能力、监听端口 */
import { NestFactory } from '@nestjs/core';
import { Config } from '@en/config';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { InterceptorInterceptor } from '@libs/shared/interceptor/interceptor';
import { InterceptorExceptionFilter } from '@libs/shared/interceptor/exceptionFilter';

async function bootstrap() {
    // 用根模块 AppModule 创建 Nest 应用实例（会扫描模块里声明的控制器、提供者等）
    const app = await NestFactory.create(AppModule);
    // 全局响应拦截器：通常用于统一包装返回结构、记录日志等（所有路由都会经过）
    app.useGlobalInterceptors(new InterceptorInterceptor());
    // 全局异常过滤器：把抛出的异常转成统一的 HTTP 响应格式
    app.useGlobalFilters(new InterceptorExceptionFilter());
    // 所有路由前加前缀，例如控制器 @Controller('user') 实际路径为 /api/user
    app.setGlobalPrefix('api');
    // 启用 URI 版本控制：客户端通过路径里的版本号访问，如 /api/v1/...
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    // Swagger 接口文档配置
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Study English API')
        .setDescription('学习英语应用的接口文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    // 访问 http://localhost:<port>/docs 即可查看文档
    SwaggerModule.setup('docs', app, document);

    // 监听端口：优先读环境变量 PORT，否则用配置里的 server 端口
    await app.listen(process.env.PORT ?? Config.port.server);
}

bootstrap().catch((err) => {
    console.error('Bootstrap failed:', err);
    process.exit(1);
});
