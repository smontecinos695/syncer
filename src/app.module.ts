import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [CoreModule, CommandsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
