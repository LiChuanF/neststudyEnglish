export const digestQueueName = {
    name: 'DIGEST_QUEUE',
    task: {
        everyDayDigest: 'EVERY_DAY_DIGEST_TASK', // 每天0点的全局分发任务
        emailDigest: 'EMAIL_DIGEST_TASK', // 具体到每个用户的发送邮件任务
    },
}
