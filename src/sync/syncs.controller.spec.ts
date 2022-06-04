import { Test, TestingModule } from '@nestjs/testing';
import { SyncsController } from './syncs.controller';

describe('SyncController', () => {
  let controller: SyncsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyncsController],
    }).compile();

    controller = module.get<SyncsController>(SyncsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
