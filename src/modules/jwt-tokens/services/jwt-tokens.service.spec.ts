import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtTokensService } from './jwt-tokens.service';

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
      providers: [JwtTokensService],
      exports: [JwtTokensService],
    }).compile();

    service = module.get<JwtTokensService>(JwtTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
