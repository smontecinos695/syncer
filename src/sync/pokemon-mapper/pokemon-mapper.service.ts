import { Injectable } from '@nestjs/common';
import { ReflectionMapper } from 'src/core/mapper/reflection-mapper';
import { Pokemon } from 'src/pokemon/models/pokemon';

@Injectable()
export class PokemonMapperService extends ReflectionMapper<Pokemon> {
  static readonly POKE_API = 'https://pokeapi.co/api/v2/';
  constructor() {
    super(Pokemon);
  }

  public mapUrl(val: string) {
    const base = PokemonMapperService.POKE_API;
    if (val.startsWith(base)) {
      return 'http://self/' + val.substr(base.length);
    }
    return val;
  }
}
