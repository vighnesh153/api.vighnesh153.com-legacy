const mongoose = require('./mongoose');
const logger = require('./logger');

module.exports = async (app) => {
  logger.configure(app);

  await mongoose.configure(app);
};
