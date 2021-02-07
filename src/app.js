const express = require('express');
const loaders = require('./loaders');

const { gracefulShutdown } = require('./util');

const app = express();

(async function configureApp() {
  try {
    await loaders(app);
  } catch (e) {
    const logger = app.get('logger');
    if (logger) {
      logger.error({
        message: e.message,
        stackTrace: e.stack,
      });
    } else {
      console.error(e);
    }
    await gracefulShutdown(app);
  }
}());

module.exports = app;
