import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { MaybeIntegerPipePipe } from 'src/core/maybe-integer-pipe.pipe';
import { Limit, Offset } from 'src/core/validations';
import { PokemonRepositoryService } from '../pokemon-repository/pokemon-repository.service';

@Controller('pokemons')
export class PokemonsController {
  public constructor(private pokemonRepository: PokemonRepositoryService) {}

  @Get()
  public index(@Limit() limit?: number, @Offset() offset?: number) {
    limit = limit || 10;
    return this.pokemonRepository.getAll(limit, offset);
  }

  @Get(':key')
  public async item(@Param('key', MaybeIntegerPipePipe) key: number | string) {
    const name = typeof key === 'number' ? 'id' : 'name';
    const item = await this.pokemonRepository.getByAttribute(name, key);
    if (item === null) {
      throw new NotFoundException();
    }
    return item;
  }
}
