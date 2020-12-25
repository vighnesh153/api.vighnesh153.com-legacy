const express = require('express');
const loaders = require('./loaders');

const app = express();

(async function configureApp() {
  try {
    await loaders(app);
  } catch (e) {
    const logger = app.get('logger');
    if (logger) {
      logger.error(e);
    } else {
      console.error(e);
    }
  }
}());

module.exports = app;
