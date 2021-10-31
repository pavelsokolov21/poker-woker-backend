import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as randToken from 'rand-token';
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

  getRefreshToken() {
    const refreshToken = randToken.generate(16);

    return refreshToken;
  }

  async updateRefreshTokenAndReturn(userId: string) {
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };
    const refreshToken = this.getRefreshToken();
    try {
      await this.refreshTokenModel.findOneAndUpdate(
        { userId },
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
    const refreshToken = await this.updateRefreshTokenAndReturn(payload.id);

    return {
      accessToken,
      refreshToken,
    };
  }
}
