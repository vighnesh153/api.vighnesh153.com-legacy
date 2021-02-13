const { gracefulShutdown } = require('../../util');

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
  logger.error({
    message: err.message,
    stackTrace: err.stack,
  });
  res.sendStatus(500);
  await gracefulShutdown(req.app);
};
