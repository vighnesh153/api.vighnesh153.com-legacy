const cache = require('./caching');

const execMiddlewares = (middlewares, req, res, next) => {
  middlewares.forEach((middleware) => {
    middleware(req, res, next);
  });
};

describe('Caching Tests', () => {
  let reqStub;
  let resStub;
  let nextStub;
  beforeEach(() => {
    reqStub = {
      logger: {
        info: jest.fn(),
      },
      query: {},
    };
    resStub = {
      json: jest.fn(),
    };
    nextStub = jest.fn();
  });

  it('should return the fresh data', () => {
    const middlewares = cache.for({
      milliseconds: 10,
    });

    execMiddlewares(middlewares, reqStub, resStub, nextStub);

    // Once in the cache freshness control middleware
    expect(nextStub).toBeCalledTimes(2);
  });

  it('should return the cached value', () => {
    const middlewares = cache.for({
      milliseconds: 10,
    });

    execMiddlewares(middlewares, reqStub, resStub, nextStub);

    // Mock the response once to be cached
    resStub.json('Test data');

    resStub = {
      json: jest.fn(),
    };
    execMiddlewares(middlewares, reqStub, resStub, nextStub);

    expect(resStub.json).toBeCalledWith('Test data');
  });

  it('should fetch fresh value after cache expiry', async () => {
    const middlewares = cache.for({
      milliseconds: 10,
    });

    execMiddlewares(middlewares, reqStub, resStub, nextStub);

    // Mock the response once to be cached
    resStub.json('Test data');

    execMiddlewares(middlewares, reqStub, resStub, nextStub);

    // Two times, once in every cache freshness
    // control middleware invocation
    expect(nextStub).toBeCalledTimes(3);

    // sleep for 11 ms so that cache expires
    await new Promise((resolve) => setTimeout(resolve, 11));

    // If `next` is invoked, it means that
    // fresh data has been fetched
    execMiddlewares(middlewares, reqStub, resStub, nextStub);
    expect(nextStub).toBeCalledTimes(5);
  });
});
