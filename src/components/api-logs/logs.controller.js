const router = require('express').Router();

const logsMiddlewares = require('./logs.middleware');
const middlewares = require('../../middlewares');

router.get('/', logsMiddlewares.getLogs);

router.get('/services', logsMiddlewares.getUniqueLogServices);

router.use(logsMiddlewares.catchAllWildcardRouteHandler);

module.exports = router;
