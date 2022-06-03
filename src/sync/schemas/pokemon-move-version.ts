//This file was autogenerated by bin/generate-schemas.py
import { ObjectSchema } from 'src/core/mapper/mapper.service';
import namedAPIResourceSchema from './named-api-resource';

const schema: ObjectSchema = {
  properties: {
    move_learn_method: namedAPIResourceSchema,

    version_group: namedAPIResourceSchema,

    level_learned_at: {
      type: 'integer',
    },
  },
};
export default schema;
