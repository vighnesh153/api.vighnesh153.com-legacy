const mongoose = require('mongoose');

module.exports = async (app) => {
  const logger = app.get('logger');

  try {
    await mongoose.connection.close();
    logger.debug('Connection closed.');
    logger.debug('Shutting down.');
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(1);
  }
};
