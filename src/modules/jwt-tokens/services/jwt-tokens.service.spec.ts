import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { JwtTokensService } from './jwt-tokens.service';
import { RefreshToken } from '../schemas/refresh-token.schema';

const mockRepository = {
  findOneAndUpdate() {
    return {};
  },
};

describe('JwtTokensService', () => {
  let service: JwtTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
            signOptions: {
              expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        JwtTokensService,
        {
          provide: getModelToken(RefreshToken.name),
          useValue: mockRepository,
        },
      ],
      exports: [JwtTokensService],
    }).compile();

    service = module.get<JwtTokensService>(JwtTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
