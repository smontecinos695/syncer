export type MapperSchema = ObjectSchema | ArraySchema | PropertySchema;

/**
 * it has to have an empty constructor
 */
export interface Class extends Function {
  new (): any;
}

export interface ObjectSchema {
  properties: {
    [x: string]: MapperSchema;
  };
  type?: Class;
}

export interface ArraySchema {
  items: MapperSchema;
}

export interface PropertySchema {
  description?: string;
  title?: string;
  type: string;
  format?: string;
}

export interface MapperConfig {
  schema: ObjectSchema & { $schema?: string; title?: string };
}

export abstract class MapperService {
  public constructor(protected config: MapperConfig) {}

  public map<T>(obj: any): T | null | undefined {
    const result = this.mapSchema(obj, this.config.schema);
    return result as T;
  }

  public mapSchema(obj: any, schema: MapperSchema) {
    if (obj === null) {
      return null;
    } else if (void 0 === obj) {
      return obj;
    }

    const anySchema = schema as any;

    if (this.hasMapper(schema)) {
      const mapper = this.getMapper(schema);
      return mapper(obj);
    }

    // manually detect and cast schema as there's
    // no type discriminator on the types definitions.

    if (anySchema.properties !== undefined) {
      return this.mapObjectSchema(obj, schema as ObjectSchema);
    } else if (anySchema.items !== undefined) {
      return this.mapArray(obj, schema as ArraySchema);
    } else if (anySchema.type !== undefined) {
      return this.mapProperty(obj, schema as PropertySchema);
    } else {
      return obj;
    }
  }

  public mapObjectSchema<T>(obj: any, schema: ObjectSchema): T {
    const result = this.instance<T>(schema.type);
    // go through each property and map it
    for (const property in schema.properties) {
      const propertySchema = schema.properties[property];
      const propertyValue = obj[property];
      result[property] = this.mapSchema(propertyValue, propertySchema);
    }
    return result;
  }

  // mappers must conform this method signature (any, T extends MapperSchema) => any
  // disable warning for this case
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public mapProperty(val: any, schema: PropertySchema) {
    return val;
  }

  public mapArray(obj: any, schema: ArraySchema) {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.mapSchema(item, schema.items));
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

  public abstract hasMapper(schema: MapperSchema): boolean;

  public abstract getMapper(schema: MapperSchema): (val: any) => any;
}
