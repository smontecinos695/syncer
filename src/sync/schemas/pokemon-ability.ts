//This file was autogenerated by bin/generate-schemas.py
import { ObjectSchema } from 'src/core/mapper/mapper.service';
import namedAPIResourceSchema from './named-api-resource';

const schema: ObjectSchema = {
  properties: {
    is_hidden: {
      type: 'boolean',
    },

    slot: {
      type: 'integer',
    },

    ability: namedAPIResourceSchema,
  },
};
export default schema;