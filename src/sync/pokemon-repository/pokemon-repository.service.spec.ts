import { Test, TestingModule } from '@nestjs/testing';
import { PokemonRepositoryService } from './pokemon-repository.service';

describe('PokemonRepositoryService', () => {
  let service: PokemonRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonRepositoryService],
    }).compile();

    service = module.get<PokemonRepositoryService>(PokemonRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
