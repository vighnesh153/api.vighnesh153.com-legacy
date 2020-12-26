const isLoggedIn = require('./isLoggedIn');
const errorHandler = require('./errorHandler');
const assignMetaToRequestAndLogger = require('./assignMetaToRequestAndLogger');

module.exports = {
  ensureAuthenticated: isLoggedIn,
  errorHandlerMiddleware: errorHandler,
  assignMetaToRequestAndLogger,
};
