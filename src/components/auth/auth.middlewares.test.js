describe('Auth Middlewares Tests', () => {
  let authMiddlewares;
  let config;

  let requestStub;
  let responseStub;
  let nextStub;

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
      header: () => 'token',
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
      expect(responseStub.cookie).toBeCalledWith(
        'user',
        expect.anything(),
        expect.anything(),
      );
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

  describe('Test getAdminToken handler', () => {
    const mockAdminToken = {
      identifier: 'some-identifier',
      expiresAt: new Date(),
    };

    beforeEach(() => {
      responseStub = {
        json: jest.fn(),
      };
      nextStub = jest.fn();
    });

    describe('Successfully created token', () => {
      beforeEach(() => {
        jest.resetModules();
        jest.mock('./auth.service', () => ({
          async createAdminToken() {
            return mockAdminToken;
          },
        }));
        /* eslint-disable global-require */
        authMiddlewares = require('./auth.middlewares');
        /* eslint-enable global-require */
      });

      it('should invoke the res.json method', async () => {
        await authMiddlewares.getAdminToken({}, responseStub, nextStub);

        expect(responseStub.json).toBeCalledTimes(1);
      });

      it('should invoke the res.json method with AdminToken', async () => {
        await authMiddlewares.getAdminToken({}, responseStub, nextStub);

        const expected = { ...mockAdminToken };
        delete expected.identifier;
        expected.token = mockAdminToken.identifier;
        expect(responseStub.json).toBeCalledWith(expected);
      });

      it('should not invoke the next middleware', async () => {
        await authMiddlewares.getAdminToken({}, responseStub, nextStub);

        expect(nextStub).toBeCalledTimes(0);
      });
    });

    describe('Failed to create token', () => {
      const mockError = new Error('Some error occurred.');

      beforeEach(() => {
        jest.resetModules();
        jest.mock('./auth.service', () => ({
          async createAdminToken() {
            throw mockError;
          },
        }));
        /* eslint-disable global-require */
        authMiddlewares = require('./auth.middlewares');
        /* eslint-enable global-require */
      });

      it('should not invoke the res.json method', async () => {
        await authMiddlewares.getAdminToken({}, responseStub, nextStub);

        expect(responseStub.json).toBeCalledTimes(0);
      });

      it('should invoke the next middleware once', async () => {
        await authMiddlewares.getAdminToken({}, responseStub, nextStub);

        expect(nextStub).toBeCalledTimes(1);
      });

      it('should invoke the next middleware with error', async () => {
        await authMiddlewares.getAdminToken({}, responseStub, nextStub);

        expect(nextStub).toBeCalledWith(mockError);
      });
    });
  });

  describe('Test verifyAdminToken handler', () => {
    beforeEach(() => {
      requestStub = {
        body: {},
        header: () => 'token',
      };
      responseStub = {
        json: jest.fn(),
      };
      nextStub = jest.fn();
    });

    describe('Cannot find Admin Token', () => {
      beforeEach(async () => {
        jest.resetModules();
        jest.mock('./auth.service', () => ({
          async findAdminToken() {
            return null;
          },
        }));
        /* eslint-disable global-require */
        authMiddlewares = require('./auth.middlewares');
        /* eslint-enable global-require */

        await authMiddlewares.verifyAdminToken(
          requestStub,
          responseStub,
          nextStub,
        );
      });

      it('should invoke res.json method', () => {
        expect(responseStub.json).toBeCalledTimes(1);
      });

      it('should invoke res.json method with 404 status', () => {
        expect(responseStub.json).toBeCalledWith({
          status: 404,
        });
      });

      it('should not invoke next middleware', () => {
        expect(nextStub).toBeCalledTimes(0);
      });
    });

    describe('Expired Admin Token', () => {
      beforeEach(async () => {
        jest.resetModules();
        jest.mock('./auth.service', () => ({
          async findAdminToken() {
            return {
              expiresAt: new Date(Date.now() - 10),
            };
          },
        }));
        /* eslint-disable global-require */
        authMiddlewares = require('./auth.middlewares');
        /* eslint-enable global-require */

        await authMiddlewares.verifyAdminToken(
          requestStub,
          responseStub,
          nextStub,
        );
      });

      it('should invoke res.json method', () => {
        expect(responseStub.json).toBeCalledTimes(1);
      });

      it('should invoke res.json method with 401 status', () => {
        expect(responseStub.json).toBeCalledWith({
          status: 401,
        });
      });

      it('should not invoke next middleware', () => {
        expect(nextStub).toBeCalledTimes(0);
      });
    });

    describe('Valid Admin Token', () => {
      beforeEach(async () => {
        jest.resetModules();
        jest.mock('./auth.service', () => ({
          async findAdminToken() {
            return {
              expiresAt: new Date(Date.now() + 10),
            };
          },
        }));
        /* eslint-disable global-require */
        authMiddlewares = require('./auth.middlewares');
        /* eslint-enable global-require */

        await authMiddlewares.verifyAdminToken(
          requestStub,
          responseStub,
          nextStub,
        );
      });

      it('should invoke the res.json method', () => {
        expect(responseStub.json).toBeCalledTimes(1);
      });

      it('should invoke the res.json method with 200', () => {
        expect(responseStub.json).toBeCalledWith({
          status: 200,
        });
      });

      it('should not invoke the next middleware', () => {
        expect(nextStub).toBeCalledTimes(0);
      });
    });

    describe('Error Occurred', () => {
      const mockError = new Error('Something went wrong!');
      beforeEach(async () => {
        jest.resetModules();
        jest.mock('./auth.service', () => ({
          async findAdminToken() {
            throw mockError;
          },
        }));
        /* eslint-disable global-require */
        authMiddlewares = require('./auth.middlewares');
        /* eslint-enable global-require */

        await authMiddlewares.verifyAdminToken(
          requestStub,
          responseStub,
          nextStub,
        );
      });

      it('should not invoke res.json method', () => {
        expect(responseStub.json).toBeCalledTimes(0);
      });

      it('should invoke next middleware', () => {
        expect(nextStub).toBeCalledTimes(1);
      });

      it('should invoke next middleware with errorObj', () => {
        expect(nextStub).toBeCalledWith(mockError);
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
