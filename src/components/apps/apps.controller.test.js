describe('Assign correct middlewares to Apps routes', () => {
  let router;
  let middlewares;
  let appsMiddlewares;

  const mockMiddlewares = {
    ensureAuthenticated: () => {},
    ensureRoles: () => {},
  };

  beforeAll(() => {
    jest.mock('../../middlewares', () => mockMiddlewares);

    /* eslint-disable global-require */
    middlewares = require('../../middlewares');
    appsMiddlewares = require('./apps.middlewares');

    jest.mock('express', () => ({
      Router() {
        return {
          get: jest.fn(),
          put: jest.fn(),
          use: jest.fn(),
        };
      },
    }));
    router = require('./apps.controller');
    /* eslint-enable global-require */
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should define a getAllApps route', () => {
    expect(router.get).toBeCalledTimes(1);
  });

  it('should assign correct middlewares to /apps (GET)', () => {
    expect(router.get).toBeCalledWith('/', appsMiddlewares.getAllApps);
  });

  it('should define a updateApps route', () => {
    expect(router.put).toBeCalledTimes(1);
  });

  it('should assign correct middlewares to /apps (PUT)', () => {
    expect(router.put).toBeCalledWith(
      '/',
      middlewares.ensureAuthenticated,
      middlewares.ensureRoles('admin'),
      appsMiddlewares.updateApps,
    );
  });
});
