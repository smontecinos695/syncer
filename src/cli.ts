import { NestFactory } from '@nestjs/core';
import { CliModule } from './cli.module';
import { CommandManagerService } from './commands/command-manager/command-manager.service';
import { hideBin } from 'yargs/helpers';

async function run() {
  const argv = hideBin(process.argv);
  const app = await NestFactory.create(CliModule);
  await app.init();
  const manager = app.get(CommandManagerService);
  const [name, ...args] = argv as string[];
  manager.run(name as string, app, args);
}

run();
