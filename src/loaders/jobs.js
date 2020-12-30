const jobs = require('../jobs');

module.exports = async function jobsLoader() {
  await jobs();
};
