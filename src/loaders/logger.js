const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const util = require('../util');
const config = require('../config');

const transport = new transports.DailyRotateFile({
  filename: '%DATE%.log',
  frequency: '24h',
  datePattern: 'YYYY-MM-DD',
  dirname: path.resolve(config.PROJECT_DIR, 'logs'),
  maxSize: '20m',
  maxFiles: '3d',
});

// transport.on('rotate', (oldFilename, newFilename) => {
//   // Upload old file to the S3 or drive
// });

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
  transports: [transport],
});

if (util.env.isProd === false) {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

const configureApp = (app) => {
  app.set('logger', logger);
};

module.exports = {
  configure: configureApp,
  instance: logger,
  transport,
};
