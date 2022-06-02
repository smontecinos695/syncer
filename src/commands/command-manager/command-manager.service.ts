import { INestApplication, Injectable } from '@nestjs/common';
import { Command } from '../command';

@Injectable()
export class CommandManagerService {
  protected registered = new Map<string, any>();

  public registerCommand(name: string, runner: any) {
    if (!this.registered.has(name)) {
      this.registered.set(name, runner);
    }
  }

  public async run(name: string, app: INestApplication, args: string[]) {
    if (this.registered.has(name)) {
      const _class = this.registered.get(name);
      const instance = app.get<Command>(_class);
      instance.run(app, args);
    }
  }

  public static getInstance() {
    if (CommandManagerService.instance === null) {
      CommandManagerService.instance = new CommandManagerService();
    }
    return CommandManagerService.instance;
  }

  private static instance: CommandManagerService | null = null;
}
