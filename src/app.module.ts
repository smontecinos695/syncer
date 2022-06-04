import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { CommandsModule } from './commands/commands.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [CoreModule, CommandsModule, PokemonModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
