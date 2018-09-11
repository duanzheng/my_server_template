import Hapi from 'hapi';
import Good from 'good';
import HapiRouter from 'hapi-router';
import HapiBoom from 'hapi-boom-decorators';
import mongoose from 'mongoose';

const server = Hapi.server({
  host: 'localhost',
  port: 8001
});

mongoose.connect('mongodb://localhost:27017/psm').then(
  () => {
    server.log(['start', 'info'], 'Mongo connect at: mongodb://localhost:27017/psm');
  },
  (err) => {
    if (err) {
      server.log(['start', 'error'], err);
    }
  }
);

const start = async () => {
  await server.register([
    {
      plugin: Good,
      options: {
        reporters: {
          console: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [
                {
                  response: '*',
                  log: '*'
                }
              ]
            },
            {
              module: 'good-console'
            },
            'stdout'
          ]
        }
      }
    },
    {
      plugin: HapiRouter,
      options: {
        routes: 'src/**/*(R|r)oute.js'
      }
    },
    {
      plugin: HapiBoom
    },
    {
      plugin: require('hapi-server-session')
    }
  ]);

  try {
    await server.start();
    server.log('info', `Server running at: ${server.info.uri}`);
  } catch (err) {
    server.error(err);
    process.exit(1);
  }
};
start();
