const mongoose = require('mongoose');

const config = require('../config');
const enums = require('../enums');

async function createConnection(db) {
  return await mongoose.createConnection(
    `${config.MONGODB_URI + db}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );
}

const dbConnections = {};
const createdConnections = [];

async function createConnections(db) {
  try {
    dbConnections[db] = await createConnection(db);
    createdConnections.push(db);
  } catch (error) {
    console.log(error);
    createdConnections.forEach((conn) => {
      dbConnections[conn].close();
    });
    process.exit(1);
  }
}

async function configureMongoose(app) {
  for (const db of Object.values(enums.dbs)) {
    await createConnections(db);
  }
  app.set('connections', dbConnections);
}

module.exports = {
  configure: configureMongoose,
  dbConnections,
};
