describe('Test Apps Service', () => {
  const loggerStub = {
    info: jest.fn(),
    error: jest.fn(),
  };

  describe('Get All Apps', () => {
    let appsService;
    beforeEach(() => {
      jest.resetModules();
    });

    it('should return null if there is error in model.find()', async () => {
      jest.mock('mongoose', () => ({
        model: () => ({
          find: () => {
            throw new Error('dummy error');
          },
        }),
      }));

      // eslint-disable-next-line global-require
      appsService = require('./apps.service');

      const apps = await appsService.getAllApps(loggerStub);
      expect(apps).toBe(null);
    });

    it('should return null if there is error in model.find().exec()', async () => {
      jest.mock('mongoose', () => ({
        model: () => ({
          find: () => ({
            exec: () => {
              throw new Error('dummy error');
            },
          }),
        }),
      }));

      // eslint-disable-next-line global-require
      appsService = require('./apps.service');

      const apps = await appsService.getAllApps(loggerStub);
      expect(apps).toBe(null);
    });

    it('should return all apps', async () => {
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
      jest.mock('mongoose', () => ({
        model: () => ({
          find: () => ({
            exec: jest.fn().mockResolvedValue(mockApps),
          }),
        }),
      }));

      // eslint-disable-next-line global-require
      appsService = require('./apps.service');

      const apps = await appsService.getAllApps(loggerStub);

      expect(apps).toStrictEqual(mockApps);
    });
  });

  describe('Update Apps', () => {
    let appsService;
    beforeEach(() => {
      jest.resetModules();
    });

    it(
      'should return false if there was an error '
        + 'while deleting existing apps',
      async () => {
        jest.mock('mongoose', () => ({
          model: () => ({
            deleteMany: () => {
              throw new Error();
            },
          }),
        }));

        // eslint-disable-next-line global-require
        appsService = require('./apps.service');

        const success = await appsService.updateApps([], loggerStub);

        expect(success).toStrictEqual(false);
      },
    );

    it(
      'should return false if there was an error '
        + 'while inserting fresh list of apps',
      async () => {
        jest.mock('mongoose', () => ({
          model: () => ({
            deleteMany: jest.fn(),
            insertMany: () => {
              throw new Error();
            },
          }),
        }));

        // eslint-disable-next-line global-require
        appsService = require('./apps.service');

        const success = await appsService.updateApps([], loggerStub);

        expect(success).toStrictEqual(false);
      },
    );

    it('should return true if insertion of apps was successful', async () => {
      jest.mock('mongoose', () => ({
        model: () => ({
          deleteMany: jest.fn(),
          insertMany: jest.fn(),
        }),
      }));

      // eslint-disable-next-line global-require
      appsService = require('./apps.service');

      const success = await appsService.updateApps([], loggerStub);

      expect(success).toStrictEqual(true);
    });
  });
});
