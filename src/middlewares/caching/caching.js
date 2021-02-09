const { Cache } = require('memory-cache');
const uuid = require('uuid');

const util = require('../../util');

const cacheInstance = new Cache();

const invalidate = () => {
  cacheInstance.clear();
};

const cacheFor = (duration) => {
  const startTimestamp = Date.now();

  const expiryTime = new util.CustomDate();
  expiryTime.addMilliSeconds(duration.milliseconds);
  expiryTime.addSeconds(duration.seconds);
  expiryTime.addMinutes(duration.minutes);
  expiryTime.addHours(duration.hours);
  expiryTime.addDays(duration.days);
  expiryTime.addWeeks(duration.weeks);
  expiryTime.addMonths(duration.months);
  expiryTime.addYears(duration.years);
  const expiryTimestamp = expiryTime.getTimestamp();

  const expiryTimeInMs = expiryTimestamp - startTimestamp;

  const key = uuid.v4();

  const allowCacheRefresh = (req, res, next) => {
    req.cacheInfo = req.cacheInfo || { [key]: {} };

    const freshRequired = Object.prototype.hasOwnProperty.call(
      req.query,
      'fresh',
    );
    if (freshRequired === false) {
      req.cacheInfo[key].fresh = false;
      next();
      return;
    }

    // Only admin can request fresh content
    const userRoles = (req.user && req.user.roles) || [];
    req.cacheInfo[key].fresh = userRoles.includes('admin');
    next();
  };

  function cacheMiddleware(req, res, next) {
    const { logger } = req;
    const freshRequired = req.cacheInfo[key].fresh;
    const cachedValue = cacheInstance.get(key);
    if (cachedValue === null || freshRequired) {
      const resJsonRef = res.json;
      // The following has to be a function with
      // the `function` keyword to preserve `this`.
      // eslint-disable-next-line func-names
      res.json = function (responseData) {
        cacheInstance.put(key, responseData, expiryTimeInMs, () => {
          logger.info({
            message: 'Clearing cache',
            cachedData: {
              key,
              value: responseData,
            },
            method: req.method,
            params: req.params,
          });
        });
        resJsonRef.call(this, responseData);
      };
      next();
      return;
    }
    logger.info({
      message: 'Serving from CACHE',
      cachedData: {
        key,
        value: cachedValue,
      },
      path: req.url,
      method: req.method,
      params: req.params,
    });
    res.json(cachedValue);
  }

  return [allowCacheRefresh, cacheMiddleware];
};

module.exports = {
  invalidate,
  for: cacheFor,
};
