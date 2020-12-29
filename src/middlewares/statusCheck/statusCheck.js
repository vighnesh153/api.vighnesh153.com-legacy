module.exports = function statusCheck(req, res) {
  const { logger } = req;

  logger.info({ message: 'Status Check' });

  // TODO: Health checkup, more sophisticated analysis
  res.sendStatus(200);
};
