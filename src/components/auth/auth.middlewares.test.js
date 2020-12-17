describe('Auth Middlewares Tests', () => {
  let authMiddlewares;
  let config;

  let requestStub;
  let responseStub;

  beforeEach(() => {
    jest.mock('./auth.service', () => ({
      async createSession() {
        return {
          identifier: 'some-identifier',
        };
      },
    }));

    /* eslint-disable global-require */
    authMiddlewares = require('./auth.middlewares');
    config = require('../../config');
    /* eslint-enable global-require */

    requestStub = {
      user: {
        name: 'vighnesh',
        roles: ['role1', 'role2'],
        profileImage: 'URL',
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Test Github Login Success', () => {
    beforeEach(() => {
      responseStub = {
        cookie: jest.fn(),
        redirect: jest.fn(),
      };
    });

    it('should set session and user cookies', async () => {
      await authMiddlewares.githubSignupSuccess(requestStub, responseStub);

      expect(responseStub.cookie).toBeCalledTimes(2);
      expect(responseStub.cookie).toBeCalledWith(
        'sessionId',
        expect.anything(),
        expect.anything(),
      );
      expect(responseStub.cookie).toBeCalledWith('user', expect.anything());
    });

    it('should redirect to auth client URL with a success search-param', async () => {
      await authMiddlewares.githubSignupSuccess(requestStub, responseStub);

      expect(responseStub.redirect).toBeCalledTimes(1);
      expect(responseStub.redirect).toBeCalledWith(
        `${config.AUTH_CLIENT_URL}?loginSuccess`,
      );
    });
  });

  describe('Test verify login success', () => {
    beforeEach(() => {
      responseStub = {
        json: jest.fn(),
      };
    });

    it('should send a success message', () => {
      authMiddlewares.verifyLoginSuccess({}, responseStub);

      expect(responseStub.json).toBeCalledTimes(1);
      expect(responseStub.json).toBeCalledWith({
        message: 'SUCCESS',
      });
    });
  });

  describe('Test catch-all wildcard route handler', () => {
    beforeEach(() => {
      responseStub = {
        json: jest.fn(),
      };
    });

    it('should send a generic message for all sub-routes', () => {
      authMiddlewares.catchAllWildcardRouteHandler({}, responseStub);

      expect(responseStub.json).toBeCalledTimes(1);
      expect(responseStub.json).toBeCalledWith({
        message: '✨ Authentication Portal for *.vighnesh153.com ✨',
      });
    });
  });
});
