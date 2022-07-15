import { Test, TestingModule } from '@nestjs/testing';
import { TribusService } from './tribus.service';

describe('TribusService', () => {
  let service: TribusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TribusService],
    }).compile();

    service = module.get<TribusService>(TribusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
