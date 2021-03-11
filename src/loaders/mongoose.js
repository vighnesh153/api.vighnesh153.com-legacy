const mongoose = require('mongoose');

const config = require('../config');

async function configureMongoose() {
  await mongoose.connect(config.MONGODB_URI, {
    poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}

module.exports = configureMongoose;
