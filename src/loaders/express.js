const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const controllers = require('../components/components.routes');
require('../components/components.models');

const util = require('../util');

module.exports = (app) => {
  // CORS configuration
  const corsOptions = {
    origin: ['https://vighnesh153.com', /\.vighnesh153\.com$/],
  };
  app.use(util.env.isProd ? cors(corsOptions) : cors());

  // Essential Security Headers
  app.use(helmet());

  // Json Body Parser
  app.use(express.json({ limit: '10kb' }));

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
