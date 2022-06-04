import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PokemonMapperService } from './pokemon-mapper/pokemon-mapper.service';
import { PokemonApiRepositoryService } from './pokemon-api-repository/pokemon-api-repository.service';
import { SyncsController } from './syncs.controller';
import { PokemonRepositoryService } from '../pokemon/pokemon-repository/pokemon-repository.service';
import { CoreModule } from 'src/core/core.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';
@Module({
  imports: [HttpModule, forwardRef(() => CoreModule), PokemonModule],
  providers: [
    PokemonMapperService,
    PokemonApiRepositoryService,
    PokemonRepositoryService,
  ],
  exports: [PokemonMapperService, PokemonRepositoryService],
  controllers: [SyncsController],
})
export class SyncModule {}
