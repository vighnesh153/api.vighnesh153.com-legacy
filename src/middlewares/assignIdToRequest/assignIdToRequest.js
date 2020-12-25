module.exports = function attachIdToRequest(req, res, next) {
  const logger = req.app.get("logger");
  const requestId = Math.random();

  req.logger = new Proxy(logger, {
    get(target, prop) {
      return (logObject) => {
        // eslint-disable-next-line security/detect-object-injection
        logger[prop]({ ...logObject, requestId });
      };
    },
  });

  next();
};
