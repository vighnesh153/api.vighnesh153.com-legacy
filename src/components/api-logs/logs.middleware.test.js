describe('Logs Middleware tests', () => {
  let mockServices;
  let reqStub;
  let resStub;

  let logsMiddleware;

  beforeEach(() => {
    jest.resetModules();

    reqStub = { logger: { info: jest.fn() } };
    resStub = { json: jest.fn() };
    mockServices = { something: Math.random() };

    jest.mock('./logs.service', () => ({
      getUniqueLogServices: jest.fn().mockResolvedValue(mockServices),
    }));

    // eslint-disable-next-line global-require
    logsMiddleware = require('./logs.middleware');
  });

  it('should return correct response when unique services are requested', async () => {
    await logsMiddleware.getUniqueLogServices(reqStub, resStub);

    expect(resStub.json).toBeCalledWith({
      data: mockServices,
      message: 'Successfully fetched services.',
      status: 200,
    });
  });

  it('should return correct response when fetching services fails', async () => {
    jest.resetModules();
    mockServices = null;

    jest.mock('./logs.service', () => ({
      getUniqueLogServices: jest.fn().mockResolvedValue(mockServices),
    }));

    // eslint-disable-next-line global-require
    logsMiddleware = require('./logs.middleware');

    await logsMiddleware.getUniqueLogServices(reqStub, resStub);

    expect(resStub.json).toBeCalledWith({
      data: mockServices,
      message: 'Failed to fetch services.',
      status: 500,
    });
  });

  it('should return cool message when invoking catchAllWildcardRouteHandler', () => {
    logsMiddleware.catchAllWildcardRouteHandler(reqStub, resStub);

    expect(resStub.json).toBeCalledWith({
      message: '✨ Logs Component root for logs.vighnesh153.com ✨',
    });
  });
});
