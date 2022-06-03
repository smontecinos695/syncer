import { Test, TestingModule } from '@nestjs/testing';
import { RunMigrationCommand } from './run-migration.command';

describe('RunMigrationCommand', () => {
  let service: RunMigrationCommand;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunMigrationCommand],
    }).compile();

    service = module.get<RunMigrationCommand>(RunMigrationCommand);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
