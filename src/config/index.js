const { config, missingEnvVars } = require('./config');

if (missingEnvVars.length > 0) {
  // eslint-disable-next-line no-console
  console.log('Missing environment variables:');

  missingEnvVars.forEach((envVar) => {
    // eslint-disable-next-line no-console
    console.log(envVar);
  });

  process.exit(1);
}

module.exports = config;
