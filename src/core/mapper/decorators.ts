export const schemaPropertiesSymbol = Symbol('attribues');

export type AttributeOptions<T> = {
  name?: string;
  items?: T;
  format?: string;
};

export function Attribute<T>(options?: AttributeOptions<T>): PropertyDecorator {
  return (target, key) => {
    let properties = Reflect.getMetadata(schemaPropertiesSymbol, target);
    if (properties === undefined) {
      properties = {};
    }
    const type = Reflect.getMetadata('design:type', target, key);
    properties[key] = { type, ...options };
    Reflect.defineMetadata(schemaPropertiesSymbol, properties, target);
  };
}
