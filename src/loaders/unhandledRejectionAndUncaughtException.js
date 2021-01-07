const { gracefulShutdown } = require('../util');

module.exports = function unhandledAndUncaughtStuff(app) {
  const logger = app.get('logger');

  process.on('unhandledRejection', async (reason) => {
    logger.error({
      stack: reason && reason.stack,
      reason: 'Unhandled Rejection at Promise',
      message: reason && reason.message,
    });
    await gracefulShutdown(app);
  });

  process.on('uncaughtException', async (err) => {
    logger.error({
      err: {
        message: `CATASTROPHIC: ${err.message}`,
        stackTrace: err.stack,
      },
      cause: 'Uncaught Exception thrown',
    });
    await gracefulShutdown(app);
  });
};
