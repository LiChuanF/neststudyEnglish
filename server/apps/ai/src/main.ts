import { NestFactory } from '@nestjs/core';
import { AiModule } from './ai.module';
import { InterceptorInterceptor } from '@libs/shared/interceptor/interceptor';
import { InterceptorExceptionFilter } from '@libs/shared/interceptor/exceptionFilter';
import { Config } from '@en/config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AiModule);
    app.setGlobalPrefix('ai');
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalInterceptors(new InterceptorInterceptor());
    app.useGlobalFilters(new InterceptorExceptionFilter());
    await app.listen(process.env.PORT ?? Config.port.ai);
}
bootstrap().catch((err) => {
    console.error('Bootstrap failed:', err);
    process.exit(1);
});
