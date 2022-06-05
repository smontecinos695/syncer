import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MaybeIntegerPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      return value;
    }
    const result = parseInt(value);
    if (Number.isInteger(result)) {
      return result;
    }
    return value;
  }
}
