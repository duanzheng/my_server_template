import { sayHello } from './controller';
import * as validator from './validator';

export default [
  {
    method: 'GET',
    path: '/api/sayHello',
    config: {
      tags: ['api'],
      description: '打个招呼',
      handler: sayHello,
      validate: validator.sayHello
    }
  }
];
