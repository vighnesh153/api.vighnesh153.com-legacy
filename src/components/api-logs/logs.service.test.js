describe('Logs Service tests', () => {
  let mockUniqueServices;
  let logService;
  let logger;
  beforeEach(() => {
    jest.resetModules();
    mockUniqueServices = {
      something: Math.random(),
    };
    logger = {
      error: jest.fn(),
    };
  });

  it('should return the unique service names', async () => {
    jest.mock('mongoose', () => ({
      model: () => ({
        distinct: () => ({
          exec: jest.fn().mockResolvedValue(mockUniqueServices),
        }),
      }),
    }));

    // eslint-disable-next-line global-require
    logService = require('./logs.service');

    const result = await logService.getUniqueLogServices(logger);

    expect(result).toBe(mockUniqueServices);
  });

  it('should return null if some error occurs', async () => {
    jest.mock('mongoose', () => ({
      model: () => ({
        distinct: () => ({
          exec: jest.fn().mockRejectedValue(new Error('bla bla bla')),
        }),
      }),
    }));

    // eslint-disable-next-line global-require
    logService = require('./logs.service');

    const result = await logService.getUniqueLogServices(logger);

    expect(result).toBe(null);
  });
});
