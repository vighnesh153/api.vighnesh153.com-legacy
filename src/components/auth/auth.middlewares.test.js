jest.mock('./auth.service', () => ({
  async getSession() {
    return {
      identifier: 'some-identifier',
    };
  },
}));

const authMiddlewares = require('./auth.middlewares');
const config = require('../../config');

describe('Test Github Login Success', () => {
  const requestStub = {
    user: {
      name: 'vighnesh',
      roles: ['role1', 'role2'],
      profileImage: 'URL',
    },
  };

  const responseStub = {
    cookie: jest.fn(),
    redirect: jest.fn(),
  };

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
  const responseStub = {
    json: jest.fn(),
  };

  it('should send a success message', () => {
    authMiddlewares.verifyLoginSuccess({}, responseStub);

    expect(responseStub.json).toBeCalledTimes(1);
    expect(responseStub.json).toBeCalledWith({
      message: 'SUCCESS',
    });
  });
});

describe('Test catch-all wildcard route handler', () => {
  const responseStub = {
    json: jest.fn(),
  };

  it('should send a generic message for all sub-routes', () => {
    authMiddlewares.catchAllWildcardRouteHandler({}, responseStub);

    expect(responseStub.json).toBeCalledTimes(1);
    expect(responseStub.json).toBeCalledWith({
      message: '✨ Authentication Portal for *.vighnesh153.com ✨',
    });
  });
});
