const router = require('express').Router();

const authMiddlewares = require('./auth.middlewares');
const middlewares = require('../../middlewares');

router.get('/github', authMiddlewares.passportGithubAuth);

router.get(
  '/github/callback',
  authMiddlewares.passportGithubAuthCallback,
  authMiddlewares.githubSignupSuccess,
);

router.get(
  '/verify',
  middlewares.ensureAuthenticated,
  authMiddlewares.verifyLoginSuccess,
);

router.get(
  '/admin-token',
  middlewares.ensureAuthenticated,
  middlewares.ensureRoles('admin'),
  authMiddlewares.getAdminToken,
);

router.post(
  '/verify-admin-token',
  middlewares.ensureAuthenticated,
  middlewares.ensureRoles('admin'),
  authMiddlewares.verifyAdminToken,
);

router.use(authMiddlewares.catchAllWildcardRouteHandler);

module.exports = router;
