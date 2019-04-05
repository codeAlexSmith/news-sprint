const ENV = process.env.NODE_ENV || 'test'
const development = require('./dev-data');
const test = require('./test-data/index');
const production = require('./test-data/index');

const data = {
    production,
  development,
  test,
};


module.exports = data[ENV];
