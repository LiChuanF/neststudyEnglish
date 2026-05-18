import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
    thisTest() {
        return 'shared test';
    }
}
