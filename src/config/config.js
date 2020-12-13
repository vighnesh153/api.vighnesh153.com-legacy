require('dotenv').config();

const missingEnvVars = [];
const addMissingEnvVar = (varName) => missingEnvVars.push(varName);

const { env } = process;

const config = {
  PROJECT_DIR: env.PROJECT_DIR,
  ENV: env.NODE_ENV || addMissingEnvVar('NODE_ENV'),
  PORT: env.PORT || 80,
  MONGODB_URI: env.MONGODB_URI || addMissingEnvVar('MONGODB_URI'),
  LOG_LEVEL: env.LOG_LEVEL || 'info',
};

module.exports = {
  config,
  missingEnvVars,
};
