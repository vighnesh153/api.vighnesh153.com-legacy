const authController = require('./auth/auth.controller');
const appsController = require('./apps/apps.controller');
const logsController = require('./api-logs/logs.controller');

module.exports = {
  configure: (app) => {
    app.use('/auth', authController);
    app.use('/apps', appsController);
    app.use('/logs', logsController);
  },
};
