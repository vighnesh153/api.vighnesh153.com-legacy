const config = require('../config');

const envMethods = {
  isDev: config.env === 'development',
  isProd: config.env === 'production',
};

module.exports = envMethods;
