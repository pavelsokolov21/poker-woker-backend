import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { JwtPayload } from '../../../interfaces/jwtPayload.interface';

@Injectable()
export class JwtTokensService {
  constructor(private jwtService: JwtService) {}

  getAccessToken(payload: JwtPayload) {
    // Secret key and exp date have been configured in jwt-tokens.module.ts
    return this.jwtService.sign(payload);
  }

  getRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  async generateTokens(payload: JwtPayload) {
    const accessToken = this.getAccessToken(payload);
    const refreshToken = this.getRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }
}
