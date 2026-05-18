import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

const REFRESH_TTL_SEC = 7 * 24 * 60 * 60; // 与 refreshToken expiresIn 保持一致

@Injectable()
export class RefreshTokenService implements OnModuleDestroy {
    private readonly redis: Redis;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.redis = new Redis({
            host: this.configService.get<string>('REDIS_HOST'),
            port: Number(this.configService.get('REDIS_PORT') ?? 6379),
        });
    }

    private key(userId: string) {
        return `refresh:${userId}`;
    }

    /** 登录/注册/刷新成功后，记录当前有效的 refresh jti */
    async setCurrentJti(userId: string, jti: string) {
        await this.redis.set(this.key(userId), jti, 'EX', REFRESH_TTL_SEC);
    }

    /**
     * 校验旧 jti 并轮换为新 jti
     * - ok: 校验通过且已写入新 jti
     * - reuse: 旧 jti 已被使用过（疑似重放），已吊销该用户 refresh
     * - missing: Redis 中无记录（已登出或从未签发）
     */
    async validateAndRotate(
        userId: string,
        currentJti: string,
        newJti: string,
    ): Promise<'ok' | 'reuse' | 'missing'> {
        const stored = await this.redis.get(this.key(userId));
        if (!stored) {
            return 'missing';
        }
        if (stored !== currentJti) {
            await this.redis.del(this.key(userId));
            return 'reuse';
        }
        await this.redis.set(this.key(userId), newJti, 'EX', REFRESH_TTL_SEC);
        return 'ok';
    }

    /** 登出时吊销 refresh */
    async revoke(userId: string) {
        await this.redis.del(this.key(userId));
    }

    onModuleDestroy() {
        this.redis.quit();
    }
}
