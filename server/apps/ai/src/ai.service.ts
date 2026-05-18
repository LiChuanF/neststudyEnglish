import { Injectable } from '@nestjs/common';
import { ResponseService } from '@libs/shared';

@Injectable()
export class AiService {
    constructor(private readonly response: ResponseService) {}
    getHello() {
        const res = {
            success: true,
            data: 'Hello World!',
            code: 200,
            message: 'success',
        };
        return this.response.success(res);
    }
}
