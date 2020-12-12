const config = require('../config');

const envMethods = {
  isDev: config.ENV === 'development',
  isProd: config.ENV === 'production',
};

module.exports = envMethods;
