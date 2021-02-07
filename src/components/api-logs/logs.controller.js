const router = require('express').Router();
const mongoose = require('mongoose');

const logsMiddlewares = require('./logs.middleware');
const middlewares = require('../../middlewares');

router.get(
  '/',
  middlewares.ensureAuthenticated,
  middlewares.ensureRoles('admin'),
  middlewares.filterSortPaginate(mongoose.model('Log')),
);

router.get(
  '/services',
  middlewares.caching.for({ days: 1 }),
  logsMiddlewares.getUniqueLogServices,
);

router.use(logsMiddlewares.catchAllWildcardRouteHandler);

module.exports = router;
