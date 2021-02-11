const mongoose = require('mongoose');

module.exports = async (app) => {
  const logger = app.get('logger');

  try {
    await mongoose.connection.close();
    logger.info({ message: '💔💔💔 Connection closed. 💔💔💔' });
  } catch (err) {
    logger.error({
      message: err.message,
      stackTrace: err.stack,
    });
  } finally {
    logger.info({ message: '☠️☠️☠️ Shutting down. ☠️☠️☠️' });
    process.exit(1);
  }
};
