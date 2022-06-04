import { forwardRef, Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { PokemonRepositoryService } from './pokemon-repository/pokemon-repository.service';
import { PokemonsController } from './pokemons/pokemons.controller';

@Module({
  imports: [forwardRef(() => CoreModule)],
  controllers: [PokemonsController],
  providers: [PokemonRepositoryService],
})
export class PokemonModule {}
