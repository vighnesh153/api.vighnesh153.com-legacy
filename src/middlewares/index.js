const isLoggedIn = require('./isLoggedIn');
const errorHandler = require('./errorHandler');
const assignMetaToRequestAndLogger = require('./assignMetaToRequestAndLogger');
const handle404 = require('./404');
const statusCheck = require('./statusCheck');
const ensureRoles = require('./ensureRoles');

module.exports = {
  ensureAuthenticated: isLoggedIn,
  errorHandlerMiddleware: errorHandler,
  assignMetaToRequestAndLogger,
  handle404,
  statusCheck,
  ensureRoles,
};
