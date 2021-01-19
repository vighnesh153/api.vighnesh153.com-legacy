describe('Test Auth Service', () => {
  let mockModelObj;
  let authService;

  beforeEach(() => {
    jest.mock('mongoose', () => ({
      model() {
        return {
          async create() {
            mockModelObj = Math.random();
            return mockModelObj;
          },
          async findOne() {
            mockModelObj = Math.random();
            return mockModelObj;
          },
        };
      },
    }));
    /* eslint-disable global-require */
    authService = require('./auth.service');
    /* eslint-enable global-require */
  });

  it('should create a new session and return it', async () => {
    const session = await authService.createSession({});
    expect(session).toBe(mockModelObj);
  });

  it('should create a new admin token and return it', async () => {
    const adminToken = await authService.createAdminToken();
    expect(adminToken).toBe(mockModelObj);
  });

  it('should return the admin token', async () => {
    const adminToken = await authService.findAdminToken();
    expect(adminToken).toBe(mockModelObj);
  });
});
