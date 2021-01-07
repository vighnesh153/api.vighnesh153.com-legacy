const router = require('express').Router();

const appsMiddlewares = require('./apps.middlewares');
const middlewares = require('../../middlewares');

router.get('/', appsMiddlewares.getAllApps);

router.put(
  '/',
  middlewares.ensureAuthenticated,
  middlewares.ensureRoles('admin'),
  appsMiddlewares.updateApps,
);

// router.use(appsMiddlewares.catchAllWildcardRouteHandler);

module.exports = router;
