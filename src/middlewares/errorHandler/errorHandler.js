const { gracefulShutdown } = require('../../util');

// eslint-disable-next-line no-unused-vars
module.exports = async function errorHandler(err, req, res, next) {
  const { logger } = req;

  if (err.isTrusted) {
    logger.warn({
      message: err.message,
      requestBody: req.body,
      params: req.params,
    });
    res.sendStatus(err.statusCode);
    return;
  }
  if (err.code === 'EBADCSRFTOKEN') {
    logger.warn({
      message: 'Error Bad CSRF Token',
      path: req.url,
      requestBody: req.body,
      params: req.params,
    });
    res.sendStatus(400);
    return;
  }

  // Not a trusted error
  logger.error({
    message: err.message,
    stackTrace: err.stack,
    path: req.url,
    requestBody: req.body,
    params: req.params,
  });
  res.sendStatus(500);
  await gracefulShutdown(req.app);
};
