//This file was autogenerated by bin/generate-schemas.py
import { Attribute } from 'src/core/mapper/decorators';
import { NamedAPIResource } from './named-api-resource';

export class PokemonAbility {
  @Attribute({ name: 'is_hidden' })
  isHidden: boolean;

  @Attribute()
  slot: number;

  @Attribute()
  ability: NamedAPIResource;
}
