const LogsService = require('./logs.service');

exports.getUniqueLogServices = async function getUniqueLogServices(req, res) {
  const { logger } = req;

  logger.info({ message: 'BEGIN: Fetch all unique log services.' });
  const services = await LogsService.getUniqueLogServices(logger);
  logger.info({ message: 'END: Fetch all unique log services.' });

  res.json(services);
};

exports.getLogs = async function getLogs(req, res) {
  const { logger } = req;

  console.log(req.query);
  console.log(req.query.filter.requestId);
  console.log(req.query.filter.timestamp);

  // logger.info({ message: 'BEGIN: Fetch logs.' });
  const logs = await LogsService.getLogs(logger);
  // logger.info({ message: 'END: Fetch logs.' });

  res.json(logs);
};

exports.catchAllWildcardRouteHandler = function catchAllWildcardRouteHandler(
  req,
  res,
) {
  res.json({
    message: '✨ Logs Component root for logs.vighnesh153.com ✨',
  });
};
