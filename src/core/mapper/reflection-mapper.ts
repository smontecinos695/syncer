import { DefaultMapper } from './default-mapper.service';
import { Class, MapperSchema } from './mapper.service';
import { schemaPropertiesSymbol } from './decorators';
import schema from 'tmp/named-apiresource';

export class ReflectionMapper<T> extends DefaultMapper {
  static readonly primitives = new Set([String, Date, Number, Boolean]);
  public constructor(target: Class<T>) {
    super({
      schema: {
        properties: ReflectionMapper.getMapperSchemaFor(target),
      },
    });
  }

  protected static getMapperSchemaFor(obj: { prototype: any }) {
    const properties: object = Reflect.getMetadata(
      schemaPropertiesSymbol,
      obj.prototype,
    );
    const schemaProperties = {};
    if (properties !== undefined) {
      for (const propertyDefinition of Object.entries(properties)) {
        const [propName, config] = propertyDefinition;
        const { items, type, ...rest } = config;
        let schemaConfig = { ...rest };
        // flatten out references
        if (items !== undefined) {
          schemaConfig = {
            ...schemaConfig,
            items: {
              properties: this.getMapperSchemaFor(config.items),
              type: items,
            },
          };
        } else if (
          typeof config.type == 'string' ||
          ReflectionMapper.primitives.has(config.type)
        ) {
          schemaConfig = {
            ...schemaConfig,
            type: type.name || type,
          };
        } else {
          schemaConfig = {
            ...schemaConfig,
            properties: this.getMapperSchemaFor(config.type),
          };
        }
        schemaProperties[propName] = { ...schemaConfig, type };
      }
    }
    return schemaProperties;
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
