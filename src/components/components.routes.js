const authController = require('./auth/auth.controller');
const appsController = require('./apps/apps.controller');
const logsController = require('./api-logs/logs.controller');

const middlewares = require('../middlewares');

module.exports = {
  configure: (app) => {
    app.use('/auth', authController);
    app.use('/apps', appsController);
    app.use('/logs', logsController);

    // Crash Application Emulator
    app.use(
      '/crash',
      middlewares.ensureAuthenticated,
      middlewares.ensureRoles('admin'),
      (req, res, next) => {
        next(new Error('Random Error.'));
      },
    );
  },
};
