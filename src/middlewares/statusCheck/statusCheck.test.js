const statusCheck = require('./statusCheck');

describe('Middleware: Status Check', () => {
  let resStub;
  beforeEach(() => {
    resStub = {
      sendStatus: jest.fn(),
    };
  });

  it('should invoke sendStatus once', () => {
    statusCheck({}, resStub);
    expect(resStub.sendStatus).toBeCalledTimes(1);
  });

  it('should send a status of 200', () => {
    statusCheck({}, resStub);
    expect(resStub.sendStatus).toBeCalledWith(200);
  });
});
