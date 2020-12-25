const mongoose = require("mongoose");

module.exports = async (app) => {
  const logger = app.get("logger");

  try {
    await mongoose.connection.close();
    logger.silly("Connection closed.");
  } catch (e) {
    logger.error(e);
  }
};
