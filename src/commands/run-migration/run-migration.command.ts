import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBTokens } from 'src/core/tokens';
import path = require('path');
import fs = require('fs');
import { Command as ICommand } from '../command';
import { Command } from '../command.decorator';
import yargs = require('yargs');

@Injectable()
@Command('migrate')
export class RunMigrationCommand implements ICommand {
  public constructor(
    @Inject(DynamoDBTokens.DYNAMO_DB_CLIENT)
    private ddbClient: DynamoDB,
  ) {}

  get files(): Promise<Map<string, string>> {
    return new Promise((resolve, reject) => {
      fs.readdir(this.migrationsDir, (err, files) => {
        if (err) {
          return reject(err);
        }
        const res = new Map<string, string>();
        files
          .filter((x) => x.endsWith('.js'))
          .reduce((map, fname) => {
            const fullPath = path.join(this.migrationsDir, fname);
            map.set(this.fileNameToMigrationName(fname), fullPath);
            return map;
          }, res);
        return resolve(res);
      });
    });
  }

  public fileNameToMigrationName(fname: string) {
    return fname.replace(/\.js$/, '');
  }

  public get migrationsDir(): string {
    const appDir = path.dirname(path.dirname(require.main.filename));
    return path.join(appDir, 'migrations');
  }

  run(app: INestApplication, args: string[]) {
    const noop = () => ({});
    yargs(args)
      .command(
        'up <name>',
        'runs a migration',
        noop,
        this.runMigration.bind(this, app, 'up'),
      )
      .command(
        'down <name>',
        'undoes a migration',
        noop,
        this.runMigration.bind(this, app, 'down'),
      )
      .parse();
  }

  public runMigration(app: INestApplication, method: 'up' | 'down', args: any) {
    this.files
      .then((migrations) => {
        const { name } = args;
        const r = require as any;
        const migration = r(migrations.get(name));
        if (typeof migration[method] === 'function') {
          return Promise.resolve(migration[method](this.ddbClient));
        }
      })
      .catch(console.error);
  }
}
