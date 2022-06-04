import { Controller, Get } from '@nestjs/common';
import { take } from 'rxjs';
import { PokemonApiRepositoryService } from './pokemon-api-repository/pokemon-api-repository.service';

@Controller('syncs')
export class SyncsController {
  public constructor(private repository: PokemonApiRepositoryService) {}

  @Get()
  public getPokemons() {
    return this.repository.getPokemons().pipe(take(10));
  }
}
