const mongoose = require('mongoose');

module.exports = async (app) => {
  const logger = app.get('logger');

  try {
    await mongoose.connection.close();
    logger.info({ message: '💔💔💔 Connection closed. 💔💔💔' });
  } catch (e) {
    logger.error({ object: e });
  } finally {
    logger.info({ message: '☠️☠️☠️ Shutting down. ☠️☠️☠️' });
    process.exit(1);
  }
};
