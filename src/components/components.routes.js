const authController = require('./auth/auth.controller');
const appsController = require('./apps/apps.controller');

module.exports = {
  configure: (app) => {
    app.use('/auth', authController);
    app.use('/apps', appsController);
  },
};
