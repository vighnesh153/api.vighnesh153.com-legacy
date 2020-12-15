const authController = require('./auth/auth.controller');

module.exports = {
  configure: (app) => {
    app.use('/auth', authController);
  },
};
