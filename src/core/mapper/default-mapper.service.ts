import { MapperConfig, MapperSchema, MapperService } from './mapper.service';

export class DefaultMapper extends MapperService {
  public constructor(config: MapperConfig) {
    super(config);
  }

  public hasMapper(schema: MapperSchema): boolean {
    const mapperMethod = this.getMapper(schema);

    return mapperMethod !== undefined;
  }

  /**
   * gets a mapper based on the schema properties
   * mapper resolution is as follows:
   * 1 - format (mapUrl before mapString)
   * 2 - type (map class or bulit-in type)
   *    2.1 - check for class name (mapAddress before mapString)
   *    2.2 - check for type
   * @param schema
   * @returns
   */
  public getMapper(schema) {
    const anySchema = schema as any;
    const type = anySchema.format || anySchema.type;
    if (type == undefined) {
      return undefined;
    }
    const schemaName = (type.name || type) as string;
    const ucSchemaName =
      schemaName.charAt(0).toUpperCase() + schemaName.substring(1);
    const methodName = `map${ucSchemaName}`;
    const method = this[methodName];
    if (method == undefined) {
      return method;
    }
    return (val) => {
      return method.call(this, val, schema);
    };
  }
}
