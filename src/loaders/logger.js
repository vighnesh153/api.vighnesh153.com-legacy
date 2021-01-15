const path = require('path');
const { createLogger, format, transports } = require('winston');

require('winston-daily-rotate-file');
require('winston-mongodb');

const util = require('../util');
const config = require('../config');

// Log Levels
// error: 0
// warn: 1
// info: 2
// http: 3
// verbose: 4
// debug: 5
// silly: 6

const logger = createLogger({
  level: config.LOG_LEVEL,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'doll' },
});

// File logger
if (util.env.isDev) {
  const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: '%DATE%.log',
    frequency: '24h',
    datePattern: 'YYYY-MM-DD',
    dirname: path.resolve(config.PROJECT_DIR, 'logs'),
    maxSize: '20m',
    maxFiles: '3d',
  });
  // dailyRotateFileTransport.on('rotate', (oldFilename, newFilename) => {
  //   // Upload old file to the S3 or drive
  // });
  logger.add(dailyRotateFileTransport);
}

// Console logger
if (util.env.isDev) {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

// MongoDB logger
(() => {
  const mongoDBTransport = new transports.MongoDB({
    level: config.LOG_LEVEL,
    db: config.MONGODB_URI,
    options: {
      useUnifiedTopology: true,
    },
    collection: 'logs',
    storeHost: false,
    decolorize: true,
    capped: false,
    leaveConnectionOpen: false,
    expireAfterSeconds: config.MONGO_LOG_EXPIRY_SECONDS,
  });
  logger.add(mongoDBTransport);
})();

const loggerProxy = new Proxy(logger, {
  get(target, prop) {
    return (logObject = {}) => {
      const logData = {};
      if (`${logObject}` === logObject) {
        // if string
        logData.message = logObject;
      } else {
        logData.message = logObject.message || 'EMPTY';
        delete logObject.message;
        logData.metadata = logObject;
      }
      // eslint-disable-next-line security/detect-object-injection
      logger[prop](logData);
    };
  },
});

const configureApp = (app) => {
  app.set('logger', loggerProxy);
};

module.exports = {
  configure: configureApp,
  instance: loggerProxy,
};
