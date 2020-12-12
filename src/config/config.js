require('dotenv').config();

const missingEnvVars = [];
const addMissingEnvVar = (varName) => missingEnvVars.push(varName);

const config = {
  env: process.env.NODE_ENV || addMissingEnvVar('NODE_ENV'),
};

module.exports = {
  config,
  missingEnvVars,
};
