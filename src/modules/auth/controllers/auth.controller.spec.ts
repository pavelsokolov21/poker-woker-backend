import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../services/auth.service';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthController } from './auth.controller';

jest.mock('@nestjs/passport', () => ({
  PassportStrategy: jest.fn(() => class Mock {}),
  AuthGuard: jest.fn(() => class MockAuthGuard {}),
}));

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
