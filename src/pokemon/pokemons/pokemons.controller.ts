import { Controller } from '@nestjs/common';
import { Pokemon } from '../models/pokemon';

@Controller('pokemons')
export class PokemonsController {
  constructor() {
    new Pokemon();
  }
}
