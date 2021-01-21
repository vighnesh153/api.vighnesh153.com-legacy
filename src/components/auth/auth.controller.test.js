describe('Assign correct middlewares to Auth routes', () => {
  let router;
  let middlewares;
  let authMiddlewares;

  beforeEach(() => {
    jest.resetModules();

    jest.mock('../../middlewares', () => ({
      ensureAuthenticated: jest.fn(),
      ensureRoles: (...roles) => roles,
    }));

    /* eslint-disable global-require */
    middlewares = require('../../middlewares');
    authMiddlewares = require('./auth.middlewares');

    jest.mock('express', () => ({
      Router() {
        return {
          get: jest.fn(),
          post: jest.fn(),
          use: jest.fn(),
        };
      },
    }));
    router = require('./auth.controller');
    /* eslint-enable global-require */
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should define 5 get routes', () => {
    expect(router.get).toBeCalledTimes(5);
  });

  it('should assign correct middlewares to /auth/github', () => {
    expect(router.get).toBeCalledWith(
      '/github',
      authMiddlewares.passportGithubAuth,
    );
  });

  it('should assign correct middlewares to /auth/github/callback', () => {
    expect(router.get).toBeCalledWith(
      '/github/callback',
      authMiddlewares.passportGithubAuthCallback,
      authMiddlewares.githubSignupSuccess,
    );
  });

  it('should assign correct middlewares to /auth/verify', () => {
    expect(router.get).toBeCalledWith(
      '/verify',
      middlewares.ensureAuthenticated,
      authMiddlewares.verifyLoginSuccess,
    );
  });

  it('should assign correct middlewares to /admin-token', () => {
    expect(router.get).toBeCalledWith(
      '/admin-token',
      middlewares.ensureAuthenticated,
      middlewares.ensureRoles('admin'),
      authMiddlewares.getAdminToken,
    );
  });

  it('should assign correct middlewares to /verify-admin-token', () => {
    expect(router.get).toBeCalledWith(
      '/verify-admin-token',
      authMiddlewares.verifyAdminToken,
    );
  });

  describe('Catch All Handler', () => {
    it('should define 1 use route for catchAllHandler', () => {
      expect(router.use).toBeCalledTimes(1);
    });

    it('should assign correct middlewares to Catch-All handler', () => {
      expect(router.use).toBeCalledWith(
        authMiddlewares.catchAllWildcardRouteHandler,
      );
    });
  });
});
