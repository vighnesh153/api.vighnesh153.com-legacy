const mongoose = require('mongoose');

module.exports = async (app) => {
  const logger = app.get('logger');

  try {
    await mongoose.connection.close();
    logger.info({ message: '💔💔💔 Connection closed. 💔💔💔' });
    logger.info({ message: '☠️☠️☠️ Shutting down. ☠️☠️☠️' });
  } catch (e) {
    logger.error({ object: e });
  } finally {
    process.exit(1);
  }
};
