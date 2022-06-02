import { Module } from '@nestjs/common';
import { CommandManagerService } from './commands/command-manager/command-manager.service';
import { CommandsModule } from './commands/commands.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, CommandsModule],
  controllers: [],
  providers: [
    {
      provide: CommandManagerService,
      useFactory: () => CommandManagerService.getInstance(),
    },
  ],
})
export class CliModule {}
