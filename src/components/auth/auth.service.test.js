describe("Test Auth Service", () => {
  let mockSessionObj;
  let authService;

  beforeEach(() => {
    jest.mock("mongoose", () => ({
      model() {
        return {
          async create() {
            mockSessionObj = Math.random();
            return mockSessionObj;
          },
        };
      },
    }));
    /* eslint-disable global-require */
    authService = require("./auth.service");
    /* eslint-enable global-require */
  });

  it("should create a new session and return it", async () => {
    const session = await authService.createSession({});
    expect(session).toBe(mockSessionObj);
  });
});
