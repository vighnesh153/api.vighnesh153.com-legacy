const mongooseLoader = require('./mongoose');
const loggerLoader = require('./logger');
const expressLoader = require('./express');
const osSignalsLoader = require('./osSignals');

module.exports = async (app) => {
  loggerLoader.configure(app);

  await mongooseLoader.configure(app);

  expressLoader(app);

  osSignalsLoader(app);
};
