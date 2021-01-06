const { CustomDate } = require('../../util');

describe('Is Logged in: Middleware tests', () => {
  let reqStub;
  let resStub;
  let nextStub;
  let isLoggedIn;
  const appStub = {
    get() {
      return {
        error() {},
        warn() {},
        info() {},
        debug() {},
        silly() {},
      };
    },
  };
  beforeEach(() => {
    reqStub = {
      signedCookies: {},
      app: appStub,
    };
    resStub = {
      json: jest.fn(),
      clearCookie: jest.fn(),
    };
    nextStub = jest.fn();
  });

  const testShouldClearCookies = () => {
    expect(resStub.clearCookie).toBeCalledTimes(2);
    expect(resStub.clearCookie).toBeCalledWith('sessionId');
    expect(resStub.clearCookie).toBeCalledWith('user');
  };

  describe('Auth Signed cookie not provided', () => {
    beforeAll(() => {
      jest.resetModules();
    });

    beforeEach(async () => {
      /* eslint-disable global-require */
      isLoggedIn = require('./isLoggedIn');
      /* eslint-enable global-require */
      await isLoggedIn(reqStub, resStub, nextStub);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call response.json once', () => {
      expect(resStub.json).toBeCalledTimes(1);
    });

    it('should return 401 status code', () => {
      expect(resStub.json).toBeCalledWith({
        status: 401,
        message: 'NOT_AUTHENTICATED',
      });
    });

    it('should not call next middleware', () => {
      expect(nextStub).toBeCalledTimes(0);
    });

    // eslint-disable-next-line jest/expect-expect
    it('should clear the cookies', testShouldClearCookies);
  });

  describe('Invalid Auth cookie(SessionID) provided', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.mock('mongoose', () => ({
        model: () => ({
          findOne() {
            return {
              exec: jest.fn().mockResolvedValue(null),
            };
          },
        }),
      }));
      /* eslint-disable global-require */
      isLoggedIn = require('./isLoggedIn');
      /* eslint-enable global-require */
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(async () => {
      reqStub = {
        signedCookies: {
          sessionId: Math.random(),
        },
        app: appStub,
      };
      await isLoggedIn(reqStub, resStub, nextStub);
    });

    it('should call response.json once', () => {
      expect(resStub.json).toBeCalledTimes(1);
    });

    it('should return 400 is invalid session id', async () => {
      expect(resStub.json).toBeCalledWith({
        status: 400,
        message: 'BAD_REQUEST',
      });
    });

    it('should not call next middleware', () => {
      expect(nextStub).toBeCalledTimes(0);
    });

    // eslint-disable-next-line jest/expect-expect
    it('should clear the cookies', testShouldClearCookies);
  });

  describe('Valid Auth cookie(SessionID) provided: Session Expired', () => {
    beforeAll(() => {
      jest.resetModules();
      const mockCustomDate = new CustomDate();
      jest.mock('mongoose', () => ({
        model: () => ({
          findOne() {
            return {
              exec: jest.fn().mockResolvedValue({
                userId: '123',
                expiresAt: mockCustomDate.addDays(-1).toDate(),
              }),
            };
          },
        }),
      }));
      /* eslint-disable global-require */
      isLoggedIn = require('./isLoggedIn');
      /* eslint-enable global-require */
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    beforeEach(async () => {
      reqStub = {
        signedCookies: {
          sessionId: Math.random(),
        },
        app: appStub,
      };
      await isLoggedIn(reqStub, resStub, nextStub);
    });

    it('should call response.json once', () => {
      expect(resStub.json).toBeCalledTimes(1);
    });

    it('should return 401 status code', () => {
      expect(resStub.json).toBeCalledWith({
        status: 401,
        message: 'SESSION_EXPIRED',
      });
    });

    it('should not call next middleware', () => {
      expect(nextStub).toBeCalledTimes(0);
    });

    // eslint-disable-next-line jest/expect-expect
    it('should clear the cookies', testShouldClearCookies);
  });

  describe('Valid Auth cookie(SessionID) provided: Session Not Expired', () => {
    const mockUserObj = {
      name: 'Vighnesh',
    };
    beforeAll(() => {
      jest.resetModules();
      const mockCustomDate = new CustomDate();
      jest.mock('mongoose', () => ({
        model(modelName) {
          return {
            findOne() {
              return {
                exec: jest.fn().mockResolvedValue(
                  modelName === 'User'
                    ? mockUserObj
                    : {
                      userId: '123',
                      expiresAt: mockCustomDate.addDays(2).toDate(),
                    },
                ),
              };
            },
          };
        },
      }));
      /* eslint-disable global-require */
      isLoggedIn = require('./isLoggedIn');
      /* eslint-enable global-require */
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    beforeEach(async () => {
      reqStub = {
        signedCookies: {
          sessionId: Math.random(),
        },
        app: appStub,
      };
      await isLoggedIn(reqStub, resStub, nextStub);
    });

    it('should not call response.json once', () => {
      expect(resStub.json).toBeCalledTimes(0);
    });

    it('should assign user to the request', () => {
      expect(reqStub.user).toBe(mockUserObj);
    });

    it('should call next middleware', () => {
      expect(nextStub).toBeCalledTimes(1);
    });

    it('should call next middleware with no args', () => {
      expect(nextStub).toBeCalledWith();
    });
  });
});
