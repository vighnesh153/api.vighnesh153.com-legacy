const mongoose = require('./mongoose');

module.exports = async (app) => {
  await mongoose.configure(app);
};
