import { Server } from 'hapi';
import good from 'good';
import * as overjoyAwait from 'overjoy-await';
import * as hapiRedisConnection from 'hapi-redis';
import * as hapiMongoDB from 'hapi-mongodb';
import * as hapiResponseTime from 'hapi-response-time';


import config from './config';
import routes from './routes';


const options = {
  connection : {
    host: 'redis',
    port: '6379'
  }
};

export async function main(server = new Server()) {
  server.connection({
    port: config.server.port,
    host: config.server.host,
    router: {
      stripTrailingSlash: true,
    },
  });
  server.log('server', 'Serveur configuration load');

  await server.register({
    register: hapiRedisConnection,
    options: options
    }, (error) => {
    if (error) {
      server.log('server', `Redis client error ${options.host}:${options.port}` );
    }
  });
  await server.register({
    register: hapiMongoDB,
    options: config.modules.mongo.client.default
    }, (error) => {
    if (error) {
      server.log('server', `Mongo client error ${config.modules.mongo.default}` );
    }
  });
  await server.register({
    register: hapiResponseTime
  }, (error) => {
    if (error) {
      server.log('server', 'hapi-response-time loading error' );
    }
  });
  await server.register({
    register: routes
  });

  // don't log when test
  if (config.modules.good) {
    await server.register({
      register: good,
      options: {
        reporters: {
          console: [{
            module: 'good-console',
          }, 'stdout'],
        },
      },
    });
  }

  if (config.server.listen) {
    await server.start();
    server.log('server', `Server is listening at : ${server.info.uri.toLowerCase()}`);
  }

  return server;
};
