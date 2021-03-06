//This file was autogenerated by bin/generate-schemas.py
import { Attribute } from 'src/core/mapper/decorators';
import { NamedAPIResource } from './named-api-resource';

export class PokemonMoveVersion {
  @Attribute({ name: 'move_learn_method' })
  moveLearnMethod: NamedAPIResource;

  @Attribute({ name: 'version_group' })
  versionGroup: NamedAPIResource;

  @Attribute({ name: 'level_learned_at' })
  levelLearnedAt: number;
}
