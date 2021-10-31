import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  RefreshToken,
  RefreshTokenDocument,
} from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { JwtPayload } from '../../../interfaces/jwtPayload.interface';

@Injectable()
export class JwtTokensService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

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

  async updateRefreshTokenAndReturn(payload: JwtPayload) {
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };
    const refreshToken = this.getRefreshToken(payload);
    try {
      await this.refreshTokenModel.findOneAndUpdate(
        { userId: payload.id },
        { refreshToken },
        options,
      );

      return refreshToken;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async generateTokens(payload: JwtPayload) {
    const accessToken = this.getAccessToken(payload);
    const refreshToken = await this.updateRefreshTokenAndReturn(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  // async validateRefreshToken(token: string) {}
}
