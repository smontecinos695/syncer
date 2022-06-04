//This file was autogenerated by bin/generate-schemas.py
import { Attribute } from 'src/core/mapper/decorators';

export class PokemonSprites {
  @Attribute({ name: 'front_default' })
  frontDefault: string;

  @Attribute({ name: 'front_shiny' })
  frontShiny: string;

  @Attribute({ name: 'front_female' })
  frontFemale: string;

  @Attribute({ name: 'front_shiny_female' })
  frontShinyFemale: string;

  @Attribute({ name: 'back_default' })
  backDefault: string;

  @Attribute({ name: 'back_shiny' })
  backShiny: string;

  @Attribute({ name: 'back_female' })
  backFemale: string;

  @Attribute({ name: 'back_shiny_female' })
  backShinyFemale: string;
}