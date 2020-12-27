const handle404 = require('./404');

describe('Middleware: 404 Handler', () => {
  let resStub;
  beforeEach(() => {
    resStub = {
      status: jest.fn().mockReturnValue({
        json: jest.fn(),
      }),
    };
    handle404({}, resStub);
  });

  it('should invoke status method once', () => {
    expect(resStub.status).toBeCalledTimes(1);
  });

  it('should set status code 404', () => {
    expect(resStub.status).toBeCalledWith(404);
  });
});
