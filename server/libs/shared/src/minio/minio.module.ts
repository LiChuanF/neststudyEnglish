import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';

@Module({
  providers: [MinioService],
  exports: [MinioService], // 导出MinioService，可以在其他地方使用
})
export class MinioModule {}
