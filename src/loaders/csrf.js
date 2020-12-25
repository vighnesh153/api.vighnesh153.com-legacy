const csrf = require('csurf');

const util = require('../util');

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
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });
};
