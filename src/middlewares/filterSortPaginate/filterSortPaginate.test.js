const filterSortPaginate = require('./filterSortPaginate');

describe('Filter, Sort, Paginate tests', () => {
  let model;
  let middleware;
  let reqStub;
  let resStub;
  let nextStub;
  beforeEach(() => {
    model = {};

    model.find = jest.fn().mockReturnValue(model);
    model.sort = jest.fn().mockReturnValue(model);
    model.limit = jest.fn().mockReturnValue(model);
    model.skip = jest.fn().mockReturnValue(model);

    middleware = filterSortPaginate(model);

    reqStub = {
      query: {},
      logger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      },
    };
    resStub = {
      json: jest.fn(),
    };
    nextStub = jest.fn();
  });

  it('should invoke the model.find with filters', () => {
    reqStub.query.filters = { name: 'Vighnesh' };
    middleware(reqStub, resStub, nextStub);

    expect(model.find).toBeCalledWith(reqStub.query.filters);
  });

  it('should invoke the model.sort with sort', () => {
    reqStub.query.sort = { name: 'Vighnesh' };
    middleware(reqStub, resStub, nextStub);

    expect(model.sort).toBeCalledWith(reqStub.query.sort);
  });

  it('should invoke the model.limit and model.skip with pagination info', () => {
    reqStub.query.pagination = {
      limit: 16,
      skip: 4342,
    };
    middleware(reqStub, resStub, nextStub);

    expect(model.limit).toBeCalledWith(reqStub.query.pagination.limit);
    expect(model.skip).toBeCalledWith(reqStub.query.pagination.skip);
  });

  it('should invoke the next handler if some error occurs', () => {
    const mockError = new Error('Some error.');
    model.find = () => {
      throw mockError;
    };
    middleware(reqStub, resStub, nextStub);

    expect(nextStub).toBeCalledTimes(1);
    expect(nextStub).toBeCalledWith(mockError);
    expect(mockError.isTrusted).toBe(true);
  });
});
