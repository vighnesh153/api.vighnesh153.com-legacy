const { gracefulShutdown } = require('../util');

module.exports = (app) => {
  const logger = app.get('logger');

  process.on('SIGINT', async () => {
    logger.info('Received signal SIGINT');
    await gracefulShutdown(app);
  });

  process.on('SIGTERM', async () => {
    logger.info('Received signal SIGTERM');
    await gracefulShutdown(app);
  });
};
