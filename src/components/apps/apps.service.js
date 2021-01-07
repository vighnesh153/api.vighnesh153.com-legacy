const mongoose = require('mongoose');

exports.getAllApps = async function getAllApps(logger) {
  const App = mongoose.model('App');
  try {
    const apps = await App.find().exec();
    logger.info({ message: 'Fetched all apps.' });
    return apps;
  } catch (err) {
    logger.error({ obj: err });
    return null;
  }
};

exports.updateApps = async function updateApps(apps, logger) {
  const App = mongoose.model('App');
  try {
    await App.deleteMany();
    logger.info({ message: 'Deleted existing apps.' });
    const transformedApps = apps.map((app, index) => ({
      name: app.name,
      url: app.url,
      description: app.description,
      priority: index + 1,
    }));
    await App.insertMany(transformedApps);
    logger.info({ message: 'Populated with updated apps.' });
    return true;
  } catch (err) {
    logger.error({ obj: err });
    return false;
  }
};
