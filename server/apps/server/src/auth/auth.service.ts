import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import type {
    TokenPayload,
    Token,
    AccessTokenPayload,
    RefreshTokenPayload,
} from '@en/common/user';
import { RefreshTokenService } from './refresh-token.service';

export type RotateRefreshResult =
    | { ok: true; token: Token; userId: string }
    | { ok: false; reason: 'invalid' | 'reuse' | 'missing' };

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly refreshTokenService: RefreshTokenService,
    ) { }

    /** 登录/注册：签发 token 并写入 Redis */
    async issueToken(payload: TokenPayload): Promise<Token> {
        const jti = randomUUID();
        await this.refreshTokenService.setCurrentJti(payload.userId, jti);
        return this.signTokens(payload, jti);
    }

    /** 刷新：校验 jti 轮换，检测重放 */
    async rotateRefreshToken(refreshToken: string): Promise<RotateRefreshResult> {
        let decoded: RefreshTokenPayload;
        try {
            decoded = this.jwtService.verify<RefreshTokenPayload>(refreshToken);
        } catch {
            return { ok: false, reason: 'invalid' };
        }

        if (decoded.tokenType !== 'refresh' || !decoded.jti) {
            return { ok: false, reason: 'invalid' };
        }

        const newJti = randomUUID();
        const status = await this.refreshTokenService.validateAndRotate(
            decoded.userId,
            decoded.jti,
            newJti,
        );

        if (status === 'reuse') {
            return { ok: false, reason: 'reuse' };
        }
        if (status === 'missing') {
            return { ok: false, reason: 'missing' };
        }

        const token = this.signTokens(
            {
                userId: decoded.userId,
                name: decoded.name,
                email: decoded.email,
            },
            newJti,
        );
        return { ok: true, token, userId: decoded.userId };
    }

    /** 登出：吊销 Redis 中的 refresh */
    async revokeRefreshToken(userId: string) {
        await this.refreshTokenService.revoke(userId);
    }

    private signTokens(payload: TokenPayload, jti: string): Token {
        return {
            accessToken: this.jwtService.sign<AccessTokenPayload>({
                ...payload,
                tokenType: 'access',
            }),
            refreshToken: this.jwtService.sign<RefreshTokenPayload>({
                ...payload,
                tokenType: 'refresh',
                jti,
            }, {
                expiresIn: '7d',
            }),
        };
    }
}
