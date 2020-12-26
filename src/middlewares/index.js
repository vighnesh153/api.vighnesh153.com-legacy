const isLoggedIn = require('./isLoggedIn');
const errorHandler = require('./errorHandler');
const assignIdToRequest = require('./assignIdToRequest');

module.exports = {
  ensureAuthenticated: isLoggedIn,
  errorHandlerMiddleware: errorHandler,
  assignIdToRequest,
};
