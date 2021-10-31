import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
} from '../../../constants/cookies';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Request() req,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const tokens = await this.authService.login(req.user);

    res.cookie(COOKIE_ACCESS_TOKEN, tokens.accessToken, {
      httpOnly: true,
    });
    res.cookie(COOKIE_REFRESH_TOKEN, tokens.refreshToken, {
      httpOnly: true,
    });

    return tokens;
  }
}
