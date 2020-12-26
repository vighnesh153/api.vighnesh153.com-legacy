const uuid = require('uuid');
const assignMetaToRequestAndLogger = require('./assignMetaToRequestAndLogger');

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
    assignMetaToRequestAndLogger(reqStub, {}, nextStub);
    expect(nextStub).toBeCalledTimes(1);
  });

  it('should assign logger to request object', () => {
    assignMetaToRequestAndLogger(reqStub, {}, nextStub);
    expect(reqStub.logger).toBeDefined();
  });

  it('should assign a valid uuid to request', () => {
    assignMetaToRequestAndLogger(reqStub, {}, nextStub);

    const isUUIDValid = uuid.validate(reqStub.requestId);
    expect(isUUIDValid).toBe(true);
  });

  it('should assign same requestId to logger and request instance', () => {
    assignMetaToRequestAndLogger(reqStub, {}, nextStub);
    const { logger } = reqStub;
    logger.info({});

    expect(loggerStub.info.mock.calls[0][0].requestId).toBe(reqStub.requestId);
  });

  it('should call the actual logger instance with a request UUID', () => {
    assignMetaToRequestAndLogger(reqStub, {}, () => {
      const { logger } = reqStub;

      const logObject = {
        a: 'dvr',
        b: 153,
      };
      logger.info(logObject);

      expect(loggerStub.info).toBeCalledWith({
        requestId: expect.anything(),
        time: expect.anything(),
        ...logObject,
      });
    });
  });
});
