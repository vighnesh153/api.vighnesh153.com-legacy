const LogsService = require('./logs.service');

exports.getUniqueLogServices = async function getUniqueLogServices(req, res) {
  const { logger } = req;

  logger.info({ message: 'BEGIN: Fetch all unique log services.' });
  const services = await LogsService.getUniqueLogServices(logger);
  logger.info({ message: 'END: Fetch all unique log services.' });

  res.json(services);
};

exports.catchAllWildcardRouteHandler = function catchAllWildcardRouteHandler(
  req,
  res,
) {
  res.json({
    message: '✨ Logs Component root for logs.vighnesh153.com ✨',
  });
};
