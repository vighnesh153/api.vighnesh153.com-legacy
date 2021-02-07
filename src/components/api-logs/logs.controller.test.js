describe('Logs Controller tests', () => {
  let mockExpressRouter;

  let mockGetUniqueLogServices;
  let mockCatchAllWildcardRouteHandler;

  let mockEnsureAuthenticated;
  let mockEnsureRolesHandler;
  let mockFilterSortPaginate;
  let mockCachingFor;

  beforeEach(() => {
    jest.resetModules();
    mockExpressRouter = {
      get: jest.fn(),
      use: jest.fn(),
    };

    mockGetUniqueLogServices = jest.fn();
    mockCatchAllWildcardRouteHandler = jest.fn();

    mockEnsureAuthenticated = jest.fn();
    mockEnsureRolesHandler = jest.fn();
    mockFilterSortPaginate = jest.fn();
    mockCachingFor = jest.fn();

    jest.mock('express', () => ({
      Router: () => mockExpressRouter,
    }));

    jest.mock('mongoose', () => ({
      model: () => {},
    }));

    jest.mock('./logs.middleware', () => ({
      getUniqueLogServices: mockGetUniqueLogServices,
      catchAllWildcardRouteHandler: mockCatchAllWildcardRouteHandler,
    }));

    jest.mock('../../middlewares', () => ({
      ensureAuthenticated: mockEnsureAuthenticated,
      ensureRoles: () => mockEnsureRolesHandler,
      filterSortPaginate: () => mockFilterSortPaginate,
      caching: { for: () => mockCachingFor },
    }));

    // eslint-disable-next-line global-require
    require('./logs.controller');
  });

  it('should invoke router.get twice', () => {
    expect(mockExpressRouter.get).toBeCalledTimes(2);
  });

  it('should invoke router.use once', () => {
    expect(mockExpressRouter.use).toBeCalledTimes(1);
  });

  it('should assign correct middlewares to /logs/', () => {
    expect(mockExpressRouter.get).toBeCalledWith(
      '/',
      mockEnsureAuthenticated,
      mockEnsureRolesHandler,
      mockFilterSortPaginate,
    );
  });

  it('should assign correct middlewares to /logs/services', () => {
    expect(mockExpressRouter.get).toBeCalledWith(
      '/services',
      mockCachingFor,
      mockGetUniqueLogServices,
    );
  });

  it('should assign correct middleware to router.use', () => {
    expect(mockExpressRouter.use).toBeCalledWith(
      mockCatchAllWildcardRouteHandler,
    );
  });
});
