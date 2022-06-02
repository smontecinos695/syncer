import { CommandManagerService } from './command-manager/command-manager.service';

export const Command = (name: string): ClassDecorator => {
  return (target) => {
    CommandManagerService.getInstance().registerCommand(name, target);
    return target;
  };
};
