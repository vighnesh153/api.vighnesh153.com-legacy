describe('Apps middlewares tests', () => {
  const mockApps = [
    {
      name: 'App 1',
      url: 'URL 1',
      description: 'Description 1',
    },
    {
      name: 'App 2',
      url: 'URL 2',
      description: 'Description 2',
    },
    {
      name: 'App 3',
      url: 'URL 3',
      description: 'Description 3',
    },
  ];
  const requestStub = {
    logger: {
      info: () => {},
    },
  };

  let responseStub;
  let AppsMiddlewares;

  describe('Get all apps', () => {
    beforeEach(() => {
      jest.mock('./apps.service', () => ({
        getAllApps: jest.fn().mockResolvedValue(mockApps),
      }));

      // eslint-disable-next-line global-require
      AppsMiddlewares = require('./apps.middlewares');

      responseStub = {
        json: jest.fn(),
      };
    });

    it('should call res.json once', async () => {
      await AppsMiddlewares.getAllApps(requestStub, responseStub);

      expect(responseStub.json).toBeCalledTimes(1);
    });

    it('should return the apps', async () => {
      await AppsMiddlewares.getAllApps(requestStub, responseStub);

      expect(responseStub.json).toBeCalledWith(mockApps);
    });
  });

  describe('Update apps', () => {
    beforeEach(() => {
      jest.resetModules();

      responseStub = {
        sendStatus: jest.fn(),
      };
    });

    it('should call res.sendStatus once', async () => {
      jest.mock('./apps.service', () => ({
        updateApps: jest.fn().mockResolvedValue(true),
      }));

      // eslint-disable-next-line global-require
      AppsMiddlewares = require('./apps.middlewares');

      await AppsMiddlewares.updateApps(requestStub, responseStub);

      expect(responseStub.sendStatus).toBeCalledTimes(1);
    });

    it('should call res.sendStatus with 200 if update success', async () => {
      jest.mock('./apps.service', () => ({
        updateApps: jest.fn().mockResolvedValue(true),
      }));

      // eslint-disable-next-line global-require
      AppsMiddlewares = require('./apps.middlewares');

      await AppsMiddlewares.updateApps(requestStub, responseStub);

      expect(responseStub.sendStatus).toBeCalledWith(200);
    });

    it('should call res.sendStatus with 500 if update failed', async () => {
      jest.mock('./apps.service', () => ({
        updateApps: jest.fn().mockResolvedValue(false),
      }));

      // eslint-disable-next-line global-require
      AppsMiddlewares = require('./apps.middlewares');

      await AppsMiddlewares.updateApps(requestStub, responseStub);

      expect(responseStub.sendStatus).toBeCalledWith(500);
    });
  });
});
