import { INestApplication, Injectable } from '@nestjs/common';
import { Command as ICommand } from './command';
import { Command } from './command.decorator';

@Command('hello')
@Injectable()
export class HelloCommand implements ICommand {
  run(app: INestApplication, rest: string[]) {
    console.log(`Hello, world ${rest.join(',')}!`);
  }
}
