module.exports = function filterSortPaginate(model) {
  return async function filterSortPaginateHandler(req, res, next) {
    const { logger } = req;
    const { filters, sort, pagination } = req.query;

    try {
      logger.info({ message: 'Applying Filters' });
      let result = model.find(filters || {});

      logger.info({ message: 'Applying Sort' });
      if (sort) {
        result = result.sort(sort);
      }

      logger.info({ message: 'Applying Pagination' });
      if (pagination) {
        result = result.skip(pagination.skip || 0);
        result = result.limit(Math.min(50, pagination.limit || 10));
      }

      logger.info({ message: 'Awaiting Results' });
      result = await result.exec();

      logger.info({ message: 'Sending Result' });
      res.json(result);
    } catch (err) {
      logger.warn({ message: 'Some error occurred.' });
      err.isTrusted = true;
      next(err);
    }
  };
};
