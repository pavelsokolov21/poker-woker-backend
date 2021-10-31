import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import * as randToken from 'rand-token';

@Injectable()
export class JwtTokensService {
  constructor(private jwtService: JwtService) {}

  getAccessToken(payload: Record<string, unknown> | string) {
    // Secret key and exp date have been configured in jwt-tokens.module.ts
    return this.jwtService.sign(payload);
  }

  getRefreshToken(userId: string) {
    const refreshToken = randToken.generate(16);

    return refreshToken;
  }
}
