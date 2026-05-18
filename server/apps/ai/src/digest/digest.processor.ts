import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { digestQueueName } from './digest.queue';
import { DigestService } from './digest.service';
import { forwardRef, Inject } from '@nestjs/common';
import { EmailService } from '@libs/shared';

@Processor(digestQueueName.name)
export class DigestProcessor extends WorkerHost {
    constructor(
        @Inject(forwardRef(() => DigestService))
        private readonly digestService: DigestService,
        private readonly emailService: EmailService
    ) {
        super();
    }
    async process(job: Job) {
        if (job.name === digestQueueName.task.everyDayDigest) {
            // 每天0点执行的全局分发任务
            console.log('触发每天0点的全局分发任务');
            await this.digestService.handleEmailDigest();
        } else if (job.name === digestQueueName.task.emailDigest) {
            // 处理邮件摘要
            const { userId, text, email } = job.data;
            console.log(userId, text, email);
            console.log('处理邮件摘要并发送邮件');
            await this.emailService.sendEmail(email, '每日摘要', text);
        }
    }
}