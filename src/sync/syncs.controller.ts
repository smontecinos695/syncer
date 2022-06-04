import { Controller, Get, Query } from '@nestjs/common';
import { switchMap } from 'rxjs';
import { PokemonApiRepositoryService } from './pokemon-api-repository/pokemon-api-repository.service';
import { PokemonRepositoryService } from '../pokemon/pokemon-repository/pokemon-repository.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('syncs')
export class SyncsController {
  public constructor(
    private api: PokemonApiRepositoryService,
    private repository: PokemonRepositoryService,
  ) {}

  @Get()
  public getPokemons() {
    const sync = uuidv4();
    return this.api
      .getPokemons({ concurrency: 10 })
      .pipe(
        switchMap((pokemons) => this.repository.bulkUpsert([pokemons], sync)),
      );
  }
}
