const { dbConnections } = require('../loaders/mongoose');

module.exports = async (app) => {
  const logger = app.get('logger');

  for (const conn of Object.values(dbConnections)) {
    try {
      await conn.close();
      logger.silly('Connection closed.');
    } catch (e) {
      logger.error(e);
    }
  }
};
