import { Module } from '@nestjs/common';
import { HelloCommand } from './hello.command';
import { RunMigrationCommand } from './run-migration/run-migration.command';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [HelloCommand, RunMigrationCommand],
  exports: [HelloCommand, RunMigrationCommand],
})
export class CommandsModule {}
