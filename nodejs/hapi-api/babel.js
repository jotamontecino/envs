
/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
//  */
//
// 'use strict';
//
// require('babel-register');
// require('babel-polyfill');
//
// // Source Map Support https://github.com/evanw/node-source-map-support
// require('source-map-support').install();
//
// // loads environment variables from a .env file into process.env.
// // require('./dotenv/config');
// require('./api');

/* eslint global-require: [0] no-console: [0] no-var: [0] import/no-unresolved: [0] */

var app

if (process.env.NODE_ENV === 'production') {
  app = require('./dist/server')
} else {
  app = require('./api')
}

Promise.resolve(app.main()).then(() => {
  console.log('Application is running.')
}).catch((e) => {
  console.error(e.stack)
})
