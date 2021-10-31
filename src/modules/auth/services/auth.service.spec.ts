import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../services/auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { JwtTokensModule } from '../../jwt-tokens/jwt-tokens.module';

jest.mock('@nestjs/passport', () => ({
  PassportStrategy: jest.fn(() => class Mock {}),
  AuthGuard: jest.fn(() => class MockAuthGuard {}),
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.resetModules();

    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtTokensModule],
      providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
