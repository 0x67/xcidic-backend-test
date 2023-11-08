import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthGuard } from 'src/api/auth/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
