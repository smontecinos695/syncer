import { AttributeOptions } from '../mapper/decorators';
import { ReflectionMapper } from '../mapper/reflection-mapper';

interface DynamoStringValue {
  S: string;
}

interface DynamoNumberValue {
  N: string;
}

interface DynamoBooleanValue {
  BOOL: boolean;
}

interface DynamoListValue {
  L: Array<any>;
}

interface DynamoMapValue {
  M: any;
}

export class DynamodbMapperService<T> extends ReflectionMapper<T> {
  public getMapper(options: AttributeOptions<any>) {
    if (ReflectionMapper.primitives.has(options.type)) {
      return super.getMapper(options);
    } else if (options.items) {
      return this.mapList;
    } else if (options.type) {
      return this.mapMap;
    }
  }

  public mapString(value: DynamoStringValue): string {
    return value.S;
  }

  public mapBoolean(value: DynamoBooleanValue): boolean {
    return value.BOOL;
  }

  public mapNumber(value: DynamoNumberValue): number {
    return Number(value.N);
  }

  public mapList(value: DynamoListValue, options: AttributeOptions<any>) {
    return super.mapArray(value.L, options);
  }

  public mapMap(value: DynamoMapValue, options: AttributeOptions<any>) {
    return super.mapObject(value.M, options.type);
  }
}
