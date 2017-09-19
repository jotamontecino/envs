import {
  hi,
} from './controller/hello';

exports.register = function(server, options, next) {

  // const db = server.app.db;
  server.route([
    {
        method: 'GET',
        path: '/hello.json',
        handler: hi
    },
  ]);

  return next();
};

exports.register.attributes = {
  name: 'routes'
};
