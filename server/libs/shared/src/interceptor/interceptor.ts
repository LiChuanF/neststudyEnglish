import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request } from 'express';

interface ResponseData {
    message?: string;
    code?: number;
    data?: unknown;
}

interface ResponseResult {
    timestamp: string;
    path: string;
    message: string;
    code: number;
    success: boolean;
    data: unknown;
}

// 将bigint转换为字符串，并保留日期类型不变
const transformBigInt = (obj: unknown): unknown => {
    if (typeof obj === 'bigint') {
        return obj.toString();
    }
    if (Array.isArray(obj)) {
        return obj.map(transformBigInt);
    }
    if (obj !== null && typeof obj === 'object') {
        if (obj instanceof Date) {
            return obj;
        }
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key,
                transformBigInt(value),
            ]),
        );
    }
    return obj;
};

@Injectable()
export class InterceptorInterceptor implements NestInterceptor<
    ResponseData,
    ResponseResult
> {
    intercept(
        context: ExecutionContext, // 执行上下文
        next: CallHandler<ResponseData>, // 下一个处理程序
    ): Observable<ResponseResult> {
        const ctx = context.switchToHttp(); // 切换到HTTP上下文
        const request = ctx.getRequest<Request>(); // 获取请求对象
        return next.handle().pipe(
            map((data) => {
                return {
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: data?.message || '请求成功',
                    code: data?.code || 200,
                    success: true,
                    data: transformBigInt(data?.data) ?? null,
                };
            }),
        );
    }
}
