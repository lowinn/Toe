import { Test, TestingModule } from '@nestjs/testing';
import { DopplerService } from './doppler.service';

describe('DopplerService', () => {
  let service: DopplerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DopplerService],
    }).compile();

    service = module.get<DopplerService>(DopplerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
