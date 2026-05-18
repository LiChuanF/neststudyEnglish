import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
    success(data: any, message: string = '操作成功', code: number = 200) {
        return {
            success: true,
            data,
            code,
            message,
        };
    }
    error(data: any, message: string = 'error', code: number = 500) {
        return {
            success: false,
            data,
            code,
            message,
        };
    }
}
