import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokensService {
  constructor(private jwtService: JwtService) {}

  getAccessToken(payload: Record<string, unknown> | string) {
    return this.jwtService.sign(payload);
  }
}
