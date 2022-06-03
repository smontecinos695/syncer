import { Injectable } from '@nestjs/common';
import { DefaultMapper } from 'src/core/mapper/default-mapper.service';
import pokemonSchema from '../schemas/pokemon';

@Injectable()
export class PokemonMapperService extends DefaultMapper {
  static readonly POKE_API = 'https://pokeapi.co/api/v2/';
  constructor() {
    super({ schema: pokemonSchema });
  }

  public mapUrl(val: string) {
    const base = PokemonMapperService.POKE_API;
    if (val.startsWith(base)) {
      return 'http://self/' + val.substr(base.length);
    }
    return val;
  }
}
