//This file was autogenerated by bin/generate-schemas.py
import { Attribute } from 'src/core/mapper/decorators';
import { NamedAPIResource } from './named-api-resource';

export class PokemonType {
  @Attribute()
  slot: number;

  @Attribute()
  type: NamedAPIResource;
}
