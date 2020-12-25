const passport = require('passport');

const githubStrategy = require('./githubStrategy');

module.exports = (app) => {
  githubStrategy();

  app.use(passport.initialize({}));
};
