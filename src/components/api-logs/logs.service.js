const mongoose = require('mongoose');

exports.getUniqueLogServices = async function getUniqueLogServices(logger) {
  const LogModel = mongoose.model('Log');
  try {
    return await LogModel.distinct('meta.service').exec();
  } catch (err) {
    logger.error({
      message: err.message,
      stackTrace: err.stack,
    });
    return null;
  }
};

exports.getLogs = async function getLogs(logger) {
  const LogModel = mongoose.model('Log');
  try {
    return await LogModel.find().exec();
  } catch (err) {
    logger.error({
      message: err.message,
      stackTrace: err.stack,
    });
    return null;
  }
};
