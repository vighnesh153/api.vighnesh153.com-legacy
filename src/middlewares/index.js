const isLoggedIn = require('./isLoggedIn');
const errorHandler = require('./errorHandler');
const assignMetaToRequestAndLogger = require('./assignMetaToRequestAndLogger');
const handle404 = require('./404');
const statusCheck = require('./statusCheck');
const ensureRoles = require('./ensureRoles');

module.exports = {
  handle404,
  assignMetaToRequestAndLogger,
  ensureRoles,
  errorHandler,
  ensureAuthenticated: isLoggedIn,
  statusCheck,
};
