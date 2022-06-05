import { Query } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../joi-validation.pipe';

export const Limit = () => {
  return Query(
    'limit',
    new JoiValidationPipe(Joi.number().optional().min(1).max(10)),
  );
};

export const Offset = () => {
  return Query(
    'offset',
    new JoiValidationPipe(Joi.number().optional().positive().min(1)),
  );
};
