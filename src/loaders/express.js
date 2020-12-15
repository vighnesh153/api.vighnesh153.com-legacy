const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const controllers = require('../components/components.routes');
require('../components/components.models');

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

  // Essential Security Headers
  app.use(helmet());

  // Json Body Parser
  app.use(express.json({ limit: '10kb' }));

  // Cookie Parser
  app.use(cookieParser(config.COOKIE_SECRET));

  // Application routes
  controllers.configure(app);

  // Health checkup basic
  app.use('/status', (req, res) => {
    res.sendStatus(200);
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
};
