const path = require('path');

require('dotenv').config();

const missingEnvVars = [];
const addMissingEnvVar = (varName) => missingEnvVars.push(varName);

const { env } = process;

const isProd = () => env.NODE_ENV === 'production';

const config = {
  // Project meta information
  PROJECT_DIR: path.resolve(__dirname, '..', '..'),

  // Server meta information
  ENV: env.NODE_ENV || addMissingEnvVar('NODE_ENV'),
  PORT: env.PORT || 80,
  COOKIE_SECRET: env.COOKIE_SECRET || 'SUPER SECRET',
  SESSION_EXPIRY_HOURS: isProd() ? 7 * 24 : 1, // 7 days for production and 1 hour for dev

  // URL meta information
  HOST_URL: env.HOST_URL || addMissingEnvVar('HOST_URL'),
  AUTH_CLIENT_URL: env.AUTH_CLIENT_URL || addMissingEnvVar('AUTH_CLIENT_URL'),

  // Database
  MONGODB_URI: env.MONGODB_URI || addMissingEnvVar('MONGODB_URI'),
  // 5 days in production and 1 hour in development
  MONGO_LOG_EXPIRY_SECONDS: isProd() ? 5 * 24 * 60 * 60 : 60 * 60,

  // Logging
  LOG_LEVEL: env.LOG_LEVEL || 'info',

  // Github Details
  GITHUB_ADMIN_USERNAME:
    env.GITHUB_ADMIN_USERNAME || addMissingEnvVar('GITHUB_ADMIN_USERNAME'),

  // Github OAuth
  GITHUB_CLIENT_ID:
    env.GITHUB_CLIENT_ID || addMissingEnvVar('GITHUB_CLIENT_ID'),
  GITHUB_CLIENT_SECRET:
    env.GITHUB_CLIENT_SECRET || addMissingEnvVar('GITHUB_CLIENT_SECRET'),
};

module.exports = {
  config,
  missingEnvVars,
};
