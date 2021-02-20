const {
  gracefulShutdown,
  env: { isProd },
} = require('../../util');

const errorOccurredEvent = require('../../events/errorOccurred');

// eslint-disable-next-line no-unused-vars
module.exports = async function errorHandler(err, req, res, next) {
  const { logger } = req;

  if (err.isTrusted) {
    logger.warn({
      message: err.message,
      stackTrace: err.stack,
    });
    res.sendStatus(err.statusCode);
    return;
  }
  if (err.code === 'EBADCSRFTOKEN') {
    logger.warn({
      message: 'Error Bad CSRF Token',
    });
    res.sendStatus(400);
    return;
  }
  if (err.message === 'request entity too large') {
    logger.error({
      message: err.message,
    });
    res.sendStatus(400);
    return;
  }

  // Not a trusted error
  const errInfo = {
    message: err.message,
    stackTrace: err.stack,
  };
  logger.error(errInfo);
  res.sendStatus(500);
  errorOccurredEvent(errInfo);

  // Sleep for 10 seconds so that all events listeners,
  // listening for error occurred can be completed
  // before shutting down the app
  await new Promise((resolve) => setTimeout(resolve, (isProd ? 10 : 3) * 1000));

  await gracefulShutdown(req.app);
};
