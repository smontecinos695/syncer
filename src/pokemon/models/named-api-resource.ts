//This file was autogenerated by bin/generate-schemas.py
import { Attribute } from 'src/core/mapper/decorators';

export class NamedAPIResource {
  @Attribute()
  name: string;

  @Attribute()
  url: string;
}
