const ensureRoles = require('./ensureRoles');

describe('Ensure Roles: Middleware tests', () => {
  describe("User Object doesn't exists in request", () => {
    let resStub;
    let nextStub;
    beforeEach(() => {
      resStub = {
        sendStatus: jest.fn(),
      };
      nextStub = jest.fn();
    });

    it('should send response only once', () => {
      ensureRoles('admin')({}, resStub, nextStub);

      expect(resStub.sendStatus).toBeCalledTimes(1);
    });

    it('should send 401 if no user in request', () => {
      ensureRoles('admin')({}, resStub, nextStub);

      expect(resStub.sendStatus).toBeCalledWith(401);
    });

    it('should not call the next handler', () => {
      ensureRoles('admin')({}, resStub, nextStub);

      expect(nextStub).toBeCalledTimes(0);
    });
  });

  describe("User doesn't have roles property", () => {
    let resStub;
    let nextStub;
    let reqStub;
    beforeEach(() => {
      reqStub = {
        user: {},
      };
      resStub = {
        sendStatus: jest.fn(),
      };
      nextStub = jest.fn();
    });

    it('should send response only once', () => {
      ensureRoles('admin')(reqStub, resStub, nextStub);

      expect(resStub.sendStatus).toBeCalledTimes(1);
    });

    it('should send 401 if no user in request', () => {
      ensureRoles('admin')(reqStub, resStub, nextStub);

      expect(resStub.sendStatus).toBeCalledWith(401);
    });

    it('should not call the next handler', () => {
      ensureRoles('admin')(reqStub, resStub, nextStub);

      expect(nextStub).toBeCalledTimes(0);
    });
  });

  describe("User doesn't have required roles", () => {
    let resStub;
    let nextStub;
    let reqStub;
    beforeEach(() => {
      reqStub = {
        user: {
          roles: ['user'],
        },
      };
      resStub = {
        sendStatus: jest.fn(),
      };
      nextStub = jest.fn();
    });

    it('should send response only once', () => {
      ensureRoles('admin')(reqStub, resStub, nextStub);

      expect(resStub.sendStatus).toBeCalledTimes(1);
    });

    it('should send 403 if no user in request', () => {
      ensureRoles('admin')(reqStub, resStub, nextStub);

      expect(resStub.sendStatus).toBeCalledWith(403);
    });

    it('should not call the next handler', () => {
      ensureRoles('admin')(reqStub, resStub, nextStub);

      expect(nextStub).toBeCalledTimes(0);
    });
  });

  describe('User has the required roles', () => {
    let resStub;
    let nextStub;
    let reqStub;
    beforeEach(() => {
      reqStub = {
        user: {
          roles: ['user', 'admin'],
        },
      };
      resStub = {
        json: jest.fn(),
        sendStatus: jest.fn(),
        send: jest.fn(),
      };
      nextStub = jest.fn();
    });

    it('should not call res.sendStatus', () => {
      ensureRoles('admin')(reqStub, resStub, nextStub);

      expect(resStub.sendStatus).toBeCalledTimes(0);
    });

    it('should not call res.json', () => {
      ensureRoles('admin')(reqStub, resStub, nextStub);

      expect(resStub.json).toBeCalledTimes(0);
    });

    it('should not call res.send', () => {
      ensureRoles('admin')(reqStub, resStub, nextStub);

      expect(resStub.send).toBeCalledTimes(0);
    });

    it('should call the next handler', () => {
      ensureRoles('admin')(reqStub, resStub, nextStub);

      expect(nextStub).toBeCalledTimes(1);
    });
  });
});
