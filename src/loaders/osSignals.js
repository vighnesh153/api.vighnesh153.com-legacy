const { gracefulShutdown } = require('../util');

module.exports = (app) => {
  const logger = app.get('logger');

  process.on('SIGINT', async () => {
    logger.info({ message: 'Received signal SIGINT' });
    await gracefulShutdown(app);
  });

  process.on('SIGTERM', async () => {
    logger.info({ message: 'Received signal SIGTERM' });
    await gracefulShutdown(app);
  });
};
