const AppsService = require('./apps.service');

exports.getAllApps = async function getAllApps(req, res) {
  const { logger } = req;
  logger.info('BEGIN: Get All Apps.');

  const apps = await AppsService.getAllApps(logger);

  res.json(apps);
};

exports.updateApps = async function updateApps(req, res) {
  const { logger } = req;
  logger.info('BEGIN: Update Apps.');

  const apps = req.body;
  const success = await AppsService.updateApps(apps, logger);

  res.sendStatus(success ? 200 : 500);
};
