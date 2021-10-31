import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

import { AuthService } from '../services/auth.service';
import { JwtTokensService } from '../../jwt-tokens/services/jwt-tokens.service';
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
} from '../../../constants/cookies';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtTokensService: JwtTokensService,
  ) {}

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

  @UseGuards(JwtRefreshGuard)
  @Post('/refresh-tokens')
  async refreshTokens(
    @Request() req,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const tokens = await this.jwtTokensService.generateTokens(req.user);

    res.cookie(COOKIE_ACCESS_TOKEN, tokens.accessToken, {
      httpOnly: true,
    });
    res.cookie(COOKIE_REFRESH_TOKEN, tokens.refreshToken, {
      httpOnly: true,
    });

    return tokens;
  }
}
