import { Controller, Get } from '@nestjs/common';
import { mergeMap } from 'rxjs';
import { PokemonApiRepositoryService } from './pokemon-api-repository/pokemon-api-repository.service';
import { PokemonRepositoryService } from './pokemon-repository/pokemon-repository.service';
import { batch } from './rxjs/operators/batch';
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
    return this.api.getPokemons().pipe(
      batch(25),
      mergeMap((batch) => this.repository.bulkUpsert(batch, sync)),
    );
  }
}
