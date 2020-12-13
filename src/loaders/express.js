const express = require('express');
const cors = require('cors');

const util = require('../util');

module.exports = (app) => {
  const corsOptions = {
    origin: ['https://vighnesh153.com', /\.vighnesh153\.com$/],
  };
  app.use(util.env.isProd ? cors(corsOptions) : cors());

  app.use(express.json({ limit: '10kb' }));

  app.use('/status', (req, res) => {
    res.sendStatus(200);
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
};
