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
      const paginationObj = {
        skip: 0,
        limit: 10,
        ...(pagination || {}),
      };
      result = result.skip(paginationObj.skip || 0);
      result = result.limit(Math.min(50, paginationObj.limit || 10));

      logger.info({ message: 'Awaiting Results' });
      result = await result.exec();

      logger.info({ message: 'Sending Result' });
      res.json(result);
    } catch (err) {
      err.isTrusted = true;
      err.statusCode = 500;
      next(err);
    }
  };
};
