import { Controller, Post, Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Request() req) {
    return req.user;
  }
}
