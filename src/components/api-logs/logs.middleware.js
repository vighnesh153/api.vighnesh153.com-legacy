const LogsService = require('./logs.service');

exports.getUniqueLogServices = async function getUniqueLogServices(req, res) {
  const { logger } = req;

  logger.info({ message: 'BEGIN: Fetch all unique log services.' });
  const services = await LogsService.getUniqueLogServices(logger);
  logger.info({ message: 'END: Fetch all unique log services.' });

  if (services) {
    res.json({
      data: services,
      status: 200,
      message: 'Successfully fetched services.',
    });
  } else {
    res.json({
      data: services,
      status: 500,
      message: 'Failed to fetch services.',
    });
  }
};

exports.catchAllWildcardRouteHandler = function catchAllWildcardRouteHandler(
  req,
  res,
) {
  res.json({
    message: '✨ Logs Component root for logs.vighnesh153.com ✨',
  });
};
