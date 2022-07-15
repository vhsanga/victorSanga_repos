import { Test, TestingModule } from '@nestjs/testing';
import { TribusController } from './tribus.controller';
import { TribusService } from './tribus.service';

describe('TribusController', () => {
  let controller: TribusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TribusController],
      providers: [TribusService],
    }).compile();

    controller = module.get<TribusController>(TribusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
