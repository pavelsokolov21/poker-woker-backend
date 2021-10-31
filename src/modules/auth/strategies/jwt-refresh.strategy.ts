import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { cookieExtractor } from './extractors/cookieExtractor';
import { COOKIE_REFRESH_TOKEN } from '../../../constants/cookies';
import { JwtPayload } from '../../../interfaces/jwtPayload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const refreshToken = cookieExtractor(request, COOKIE_REFRESH_TOKEN);

          return refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
  }

  async validate(payload: any): Promise<JwtPayload> {
    if (!payload) {
      throw new UnauthorizedException();
    }

    return { id: payload.id, email: payload.email };
  }
}
