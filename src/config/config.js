require('dotenv').config();

const missingEnvVars = [];
const addMissingEnvVar = (varName) => missingEnvVars.push(varName);

const { env } = process;

const config = {
  ENV: env.NODE_ENV || addMissingEnvVar('NODE_ENV'),
  PORT: env.PORT || 80,
  MONGODB_URI: env.MONGODB_URI || addMissingEnvVar('MONGODB_URI'),
};

module.exports = {
  config,
  missingEnvVars,
};
