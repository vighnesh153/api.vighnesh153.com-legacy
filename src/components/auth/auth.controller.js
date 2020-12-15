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
  middlewares.isLoggedIn,
  authMiddlewares.verifyLoginSuccess,
);

router.use(authMiddlewares.catchAllWildcardRouteHandler);

module.exports = router;
