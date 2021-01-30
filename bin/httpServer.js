const cluster = require('cluster');
const clusterCount = require('os').cpus().length;

const workers = {};

function spawn() {
  const worker = cluster.fork();
  workers[worker.pid] = worker;
  return worker;
}

const app = require('../src/app');

const config = require('../src/config');
const util = require('../src/util');

const logger = app.get('logger');

console.log(config.PROJECT_DIR);

if (util.env.isProd && cluster.isMaster) {
  for (let i = 0; i < clusterCount; i++) {
    spawn();
  }
  cluster.on('death', (worker) => {
    console.log(`worker ${worker.pid} died. spawning a new process...`);
    delete workers[worker.pid];
    spawn();
  });
} else {
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
}
