const app = require('../src/app');

const config = require('../src/config');

const logger = app.get('logger');

console.log(config.PROJECT_DIR);

app
  .listen(config.PORT, () => {
    logger.info({
      message: `
      ################################################
      🛡️  Server listening on port: ${config.PORT} 🛡️
      ################################################
  `,
    });
  })
  .on('error', (err) => {
    logger.error({
      object: err,
    });
    process.exit(1);
  });
