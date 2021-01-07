const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

// Initialize the mongoose models
require('../components/components.models');

const controllers = require('../components/components.routes');
const middlewares = require('../middlewares');

const configureCSRF = require('./csrf');

const util = require('../util');
const config = require('../config');

module.exports = (app) => {
  // CORS configuration
  app.use(
    cors({
      origin: util.env.isProd ? [/vighnesh153\.com$/] : [/^http:\/\/localhost/],
      credentials: true,
    }),
  );

  // Attaches Meta to the request and logger
  app.use(middlewares.assignMetaToRequestAndLogger);

  // Configure rate-limiting
  if (util.env.isProd) {
    app.use(
      rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: 10, // limit each IP to 10 requests per windowMs
      }),
    );
  }

  // Essential Security Headers
  app.use(helmet());

  // Json Body Parser
  app.use(express.json({ limit: '10kb' }));

  // Cookie Parser
  app.use(cookieParser(config.COOKIE_SECRET));

  // CSRF configuration
  configureCSRF(app);

  app.use('/status', middlewares.statusCheck);

  // Application routes
  controllers.configure(app);

  // 404 route handler
  app.use(middlewares.handle404);

  // Error handling middleware
  app.use(middlewares.errorHandlerMiddleware);

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
};
