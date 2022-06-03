import { Module } from '@nestjs/common';
import { PokemonMapperService } from './pokemon-mapper/pokemon-mapper.service';
@Module({
  providers: [PokemonMapperService],
  exports: [PokemonMapperService],
})
export class SyncModule {}
