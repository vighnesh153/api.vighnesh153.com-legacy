const isLoggedIn = require('./isLoggedIn');
const errorHandler = require('./errorHandler');
const assignMetaToRequestAndLogger = require('./assignMetaToRequestAndLogger');
const handle404 = require('./404');

module.exports = {
  ensureAuthenticated: isLoggedIn,
  errorHandlerMiddleware: errorHandler,
  assignMetaToRequestAndLogger,
  handle404,
};
