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
        domain,
      },
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    }),
  );

  app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), {
      domain,
    });
    next();
  });
};
