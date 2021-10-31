import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokensController } from './jwt-tokens.controller';

describe('JwtTokensController', () => {
  let controller: JwtTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JwtTokensController],
    }).compile();

    controller = module.get<JwtTokensController>(JwtTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
