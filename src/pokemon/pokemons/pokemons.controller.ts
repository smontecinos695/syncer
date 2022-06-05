import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { MaybeIntegerPipePipe } from 'src/core/maybe-integer-pipe.pipe';
import { PokemonRepositoryService } from '../pokemon-repository/pokemon-repository.service';

@Controller('pokemons')
export class PokemonsController {
  public constructor(private pokemonRepository: PokemonRepositoryService) {}

  @Get()
  public index() {
    return this.pokemonRepository.getAll(10, 0);
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
