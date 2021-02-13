const uuid = require('uuid');

module.exports = function attachIdToRequest(req, res, next) {
  const logger = req.app.get('logger');
  const requestId = uuid.v4();

  req.requestId = requestId;
  req.logger = new Proxy(logger, {
    get(target, prop) {
      return (logObject) => {
        // eslint-disable-next-line security/detect-object-injection
        logger[prop]({
          ...logObject,
          requestId,
          method: req.method,
          // path: req.originalUrl, // also includes query params
          path: req.baseUrl + req.path,
          params: req.params,
          query: req.query,
          requestBody: req.body,
        });
      };
    },
  });

  next();
};
