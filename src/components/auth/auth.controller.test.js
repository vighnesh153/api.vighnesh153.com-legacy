describe('Assign correct middlewares to routes', () => {
  let router;
  let middlewares;
  let authMiddlewares;

  beforeAll(() => {
    /* eslint-disable global-require */
    middlewares = require('../../middlewares');
    authMiddlewares = require('./auth.middlewares');

    jest.mock('express', () => ({
      Router() {
        return {
          get: jest.fn(),
          use: jest.fn(),
        };
      },
    }));
    router = require('./auth.controller');
    /* eslint-enable global-require */
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should define 3 routes', () => {
    expect(router.get).toBeCalledTimes(3);
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
});
