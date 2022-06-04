import { Test, TestingModule } from '@nestjs/testing';
import { PokemonApiRepositoryService } from './pokemon-api-repository.service';

describe('PokemonApirepositoryService', () => {
  let service: PokemonApiRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonApiRepositoryService],
    }).compile();

    service = module.get<PokemonApiRepositoryService>(
      PokemonApiRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
