const isLoggedIn = require("./isLoggedIn");
const errorHandler = require("./errorHandler");

module.exports = {
  ensureAuthenticated: isLoggedIn,
  errorHandlerMiddleware: errorHandler,
};
