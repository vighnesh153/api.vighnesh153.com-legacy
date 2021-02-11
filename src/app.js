const express = require('express');
const loaders = require('./loaders');

const { gracefulShutdown } = require('./util');

const app = express();

(async function configureApp() {
  try {
    await loaders(app);
  } catch (err) {
    const logger = app.get('logger');
    if (logger) {
      logger.error({
        message: err.message,
        stackTrace: err.stack,
      });
    } else {
      console.error(err);
    }
    await gracefulShutdown(app);
  }
}());

module.exports = app;
