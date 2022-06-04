import { Controller, Get, Query } from '@nestjs/common';
import { mergeMap, take } from 'rxjs';
import { PokemonApiRepositoryService } from './pokemon-api-repository/pokemon-api-repository.service';
import { PokemonRepositoryService } from '../pokemon/pokemon-repository/pokemon-repository.service';
import { batch } from './rxjs/operators/batch';
import { v4 as uuidv4 } from 'uuid';

@Controller('syncs')
export class SyncsController {
  public constructor(
    private api: PokemonApiRepositoryService,
    private repository: PokemonRepositoryService,
  ) {}

  @Get()
  public getPokemons(
    @Query('size') size: number | string = 25,
    @Query('concurrency') concurrency: number | string = 20,
  ) {
    size = typeof size === 'number' ? size : parseInt(size);
    concurrency =
      typeof concurrency === 'number' ? concurrency : parseInt(concurrency);
    const sync = uuidv4();
    return this.api.getPokemons({ concurrency }).pipe(
      batch(size),
      mergeMap(
        (pokemons) => this.repository.bulkUpsert(pokemons, sync),
        concurrency,
      ),
    );
  }
}
