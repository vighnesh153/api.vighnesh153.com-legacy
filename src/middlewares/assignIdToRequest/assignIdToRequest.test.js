const uuid = require('uuid');
const assignIdToRequest = require('./assignIdToRequest');

describe('Middleware: Assign ID to Request', () => {
  let reqStub;
  let nextStub;
  let loggerStub;
  beforeEach(() => {
    loggerStub = {
      info: jest.fn(),
    };
    reqStub = {
      app: {
        get: jest.fn().mockReturnValue(loggerStub),
      },
    };
    nextStub = jest.fn();
  });

  it('should call next once', () => {
    assignIdToRequest(reqStub, {}, nextStub);
    expect(nextStub).toBeCalledTimes(1);
  });

  it('should assign logger to request object', () => {
    assignIdToRequest(reqStub, {}, nextStub);
    expect(reqStub.logger).toBeDefined();
  });

  it('should assign a valid uuid to request', () => {
    assignIdToRequest(reqStub, {}, nextStub);

    const isUUIDValid = uuid.validate(reqStub.requestId);
    expect(isUUIDValid).toBe(true);
  });

  it('should assign same requestId to logger and request instance', () => {
    assignIdToRequest(reqStub, {}, nextStub);
    const { logger } = reqStub;
    logger.info({});

    expect(loggerStub.info.mock.calls[0][0].requestId).toBe(reqStub.requestId);
  });

  it('should call the actual logger instance with a request UUID', () => {
    assignIdToRequest(reqStub, {}, () => {
      const { logger } = reqStub;

      const logObject = {
        a: 'dvr',
        b: 153,
      };
      logger.info(logObject);

      expect(loggerStub.info).toBeCalledWith({
        requestId: expect.anything(),
        ...logObject,
      });
    });
  });
});
