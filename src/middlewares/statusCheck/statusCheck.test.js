const statusCheck = require('./statusCheck');

describe('Middleware: Status Check', () => {
  let reqStub;
  let resStub;
  beforeEach(() => {
    reqStub = {
      logger: {
        info: () => {},
      },
    };
    resStub = {
      sendStatus: jest.fn(),
    };
  });

  it('should invoke sendStatus once', () => {
    statusCheck(reqStub, resStub);
    expect(resStub.sendStatus).toBeCalledTimes(1);
  });

  it('should send a status of 200', () => {
    statusCheck(reqStub, resStub);
    expect(resStub.sendStatus).toBeCalledWith(200);
  });
});
