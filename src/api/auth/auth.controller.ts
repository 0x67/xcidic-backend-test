import { Controller, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('token')
  async getToken() {
    const token = {
      access_token: this.jwtService.sign({}),
    };

    return token;
  }
}
