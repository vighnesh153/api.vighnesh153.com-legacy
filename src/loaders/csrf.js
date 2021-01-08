const csrf = require('csurf');

const util = require('../util');

const domain = util.env.isProd ? 'vighnesh153.com' : 'localhost';

module.exports = function configureCSRF(app) {
  app.use(
    csrf({
      cookie: {
        httpOnly: true,
        secure: util.env.isProd,
        signed: true,
      },
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    }),
  );

  app.use((req, res, next) => {
    res.cookie('vighnesh153-XSRF-TOKEN', req.csrfToken(), {
      secure: util.env.isProd,
      domain,
    });
    next();
  });
};
