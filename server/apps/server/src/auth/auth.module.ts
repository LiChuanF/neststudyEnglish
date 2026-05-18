import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token.service';
import { SharedModule } from '@libs/shared';
@Module({
  providers: [AuthService, RefreshTokenService],
  exports: [AuthService],
  imports: [SharedModule],
})
export class AuthModule {}
