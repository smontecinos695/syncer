import { Test, TestingModule } from '@nestjs/testing';
import { PokemonMapperService } from './pokemon-mapper.service';

describe('PokemonMapperService', () => {
  let service: PokemonMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonMapperService],
    }).compile();

    service = module.get<PokemonMapperService>(PokemonMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
