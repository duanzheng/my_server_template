import Joi from 'joi';

export const sayHello = {
  query: {
    name: Joi.string().default('No one')
  }
};
