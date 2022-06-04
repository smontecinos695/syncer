//This file was autogenerated by bin/generate-schemas.py
import { Attribute } from 'src/core/mapper/decorators';
import { PokemonAbility } from './pokemon-ability';
import { NamedAPIResource } from './named-api-resource';
import { VersionGameIndex } from './version-game-index';
import { PokemonHeldItem } from './pokemon-held-item';
import { PokemonMove } from './pokemon-move';
import { PokemonTypePast } from './pokemon-type-past';
import { PokemonSprites } from './pokemon-sprites';
import { PokemonStat } from './pokemon-stat';
import { PokemonType } from './pokemon-type';

export class Pokemon {
  @Attribute()
  id: number;

  @Attribute()
  name: string;

  @Attribute({ name: 'base_experience' })
  baseExperience: number;

  @Attribute()
  height: number;

  @Attribute({ name: 'is_default' })
  isDefault: boolean;

  @Attribute()
  order: number;

  @Attribute()
  weight: number;

  @Attribute({ items: PokemonAbility })
  abilities: Array<PokemonAbility>;

  @Attribute({ items: NamedAPIResource })
  forms: Array<NamedAPIResource>;

  @Attribute({ name: 'game_indices', items: VersionGameIndex })
  gameIndices: Array<VersionGameIndex>;

  @Attribute({ name: 'held_items', items: PokemonHeldItem })
  heldItems: Array<PokemonHeldItem>;

  @Attribute({ name: 'location_area_encounters' })
  locationAreaEncounters: string;

  @Attribute({ items: PokemonMove })
  moves: Array<PokemonMove>;

  @Attribute({ name: 'past_types', items: PokemonTypePast })
  pastTypes: Array<PokemonTypePast>;

  @Attribute()
  sprites: PokemonSprites;

  @Attribute()
  species: NamedAPIResource;

  @Attribute({ items: PokemonStat })
  stats: Array<PokemonStat>;

  @Attribute({ items: PokemonType })
  types: Array<PokemonType>;
}
