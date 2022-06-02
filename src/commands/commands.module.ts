import { Module } from '@nestjs/common';
import { HelloCommand } from './hello.command';

@Module({
  providers: [HelloCommand],
  exports: [HelloCommand],
})
export class CommandsModule {}
