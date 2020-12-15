const path = require('path');

require('dotenv').config();

const missingEnvVars = [];
const addMissingEnvVar = (varName) => missingEnvVars.push(varName);

const { env } = process;

const config = {
  // Project meta information
  PROJECT_DIR: path.resolve(__dirname, '..', '..'),

  // Server meta information
  ENV: env.NODE_ENV || addMissingEnvVar('NODE_ENV'),
  PORT: env.PORT || 80,
  COOKIE_SECRET: env.COOKIE_SECRET || 'SUPER SECRET',

  // URL meta information
  HOST_URL: env.HOST_URL || addMissingEnvVar('HOST_URL'),
  AUTH_CLIENT_URL: env.AUTH_CLIENT_URL || addMissingEnvVar('AUTH_CLIENT_URL'),

  // Database
  MONGODB_URI: env.MONGODB_URI || addMissingEnvVar('MONGODB_URI'),

  // Logging
  LOG_LEVEL: env.LOG_LEVEL || 'info',

  // Github OAuth
  GITHUB_ADMIN_USERNAME:
    env.GITHUB_ADMIN_USERNAME || addMissingEnvVar('GITHUB_ADMIN_USERNAME'),
  GITHUB_CLIENT_ID:
    env.GITHUB_CLIENT_ID || addMissingEnvVar('GITHUB_CLIENT_ID'),
  GITHUB_CLIENT_SECRET:
    env.GITHUB_CLIENT_SECRET || addMissingEnvVar('GITHUB_CLIENT_SECRET'),
};

module.exports = {
  config,
  missingEnvVars,
};
