import {
  AttributeOptions,
  AttributeOptionsMap,
  schemaPropertiesSymbol,
} from './decorators';

/**
 * it has to have an empty constructor
 */
export interface Class<T = any> extends Function {
  new (): T;
}

export class ReflectionMapper<T> {
  static readonly primitives = new Set([String, Date, Number, Boolean]);

  public constructor(private target: Class<T>) {}

  public getSchemaAttributeOptions(
    obj: Class<T>,
  ): AttributeOptionsMap | undefined {
    if (obj === undefined) {
      return {};
    }
    return Reflect.getMetadata(
      schemaPropertiesSymbol,
      obj.prototype,
    ) as AttributeOptionsMap;
  }

  public hasAttributeOptions(obj: Class): boolean {
    return this.getSchemaAttributeOptions(obj) !== undefined;
  }

  public map<T>(obj: any): T {
    return this.mapObject(obj, this.target);
  }

  public mapSchema(obj: any, options: AttributeOptions<any>) {
    if (obj === null) {
      return null;
    } else if (void 0 === obj) {
      return obj;
    }

    if (this.hasMapper(options)) {
      const mapper = this.getMapper(options);
      return mapper(obj);
    }

    // manually detect and cast schema as there's
    // no type discriminator on the types definitions.
    if (options.items !== undefined) {
      return this.mapArray(obj, options);
    } else if (ReflectionMapper.primitives.has(options.type)) {
      return this.mapProperty(obj, options);
    } else if (this.hasAttributeOptions(options.type)) {
      return this.mapObject(obj, options.type);
    } else {
      return obj;
    }
  }

  public mapObject<T>(obj: any, type): T {
    const attributes: AttributeOptionsMap =
      this.getSchemaAttributeOptions(type);
    const result = this.instance<T>(type);

    // go through each property and map it
    for (const config of Object.entries(attributes)) {
      const [property, options] = config;
      const propertyName = options.name || property;
      const propertyValue = obj[propertyName];
      result[property] = this.mapSchema(propertyValue, options);
    }
    return result;
  }

  // mappers must conform this method signature (any, T extends MapperSchema) => any
  // disable warning for this case
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public mapProperty(val: any, options: AttributeOptions<any>) {
    return val;
  }

  public mapArray(obj: any, schema: AttributeOptions<any>) {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.mapObject(item, schema.items));
    }
    return obj;
  }

  /**
   * @param c Class definition
   * @returns a instance of class or a bare object
   */
  public instance<T>(c: Class | undefined): T {
    let res;
    if (typeof c === 'undefined') {
      res = Object.create(null);
    } else {
      res = new c();
    }
    return res as T;
  }

  public hasMapper(schema: AttributeOptions<any>): boolean {
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
  public getMapper(schema: AttributeOptions<any>) {
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
