const mongoose = require('mongoose');

exports.getAllApps = async function getAllApps(logger) {
  const App = mongoose.model('App');
  try {
    const apps = await App.find().exec();
    logger.info({ message: 'Fetched all apps.' });
    return apps;
  } catch (err) {
    logger.error({
      message: err.message,
      stackTrace: err.stack,
    });
    return null;
  }
};

exports.updateApps = async function updateApps(apps, logger) {
  const App = mongoose.model('App');
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await App.deleteMany(null, { session });
    logger.info({ message: 'Deleted existing apps.' });
    const transformedApps = apps.map((app, index) => ({
      name: app.name,
      url: app.url,
      description: app.description,
      priority: index + 1,
    }));
    await App.insertMany(transformedApps, { session });
    await session.commitTransaction();
    logger.info({ message: 'Populated with updated apps.' });
    return true;
  } catch (err) {
    await session.abortTransaction();
    logger.error({
      message: err.message,
      stackTrace: err.stack,
    });
    return false;
  } finally {
    session.endSession();
  }
};
