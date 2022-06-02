import { INestApplication } from '@nestjs/common';

export interface Command {
  run(app: INestApplication, args: string[]);
}
