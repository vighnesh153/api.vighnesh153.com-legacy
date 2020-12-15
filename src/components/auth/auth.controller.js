const passport = require('passport');
const router = require('express').Router();

const AuthService = require('./auth.service');

const middlewares = require('../../middlewares');

const config = require('../../config');
const { CustomDate, env } = require('../../util');

const domain = env.isProd ? 'vighnesh153.com' : 'localhost';

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: config.AUTH_CLIENT_URL,
  }),
  async (req, res, next) => {
    try {
      const session = await AuthService.getSession(req.user);
      if (session === null) {
        return res.redirect(`${config.AUTH_CLIENT_URL}?failed`);
      }
      res.cookie('sessionId', session.identifier, {
        httpOnly: true,
        secure: env.isProd,
        domain,
        signed: true,
        expires: new CustomDate().addDays(7).toDate(),
      });
      res.cookie(
        'user',
        JSON.stringify({
          name: req.user.name,
          roles: req.user.roles,
          profileImage: req.user.profileImage,
        }),
      );
      res.redirect(`${config.AUTH_CLIENT_URL}?loginSuccess`);
    } catch (e) {
      next(e);
    }
    return 'done';
  },
);

router.get('/verify', middlewares.isLoggedIn, (req, res) => {
  res.json({
    message: 'Yes. You are logged in.',
  });
});

router.use((req, res) => {
  res.json({
    message: '✨ Authentication Portal for *.vighnesh153.com ✨',
  });
});

module.exports = router;
