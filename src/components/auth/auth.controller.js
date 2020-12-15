const passport = require('passport');
const router = require('express').Router();

const AuthService = require('./auth.service');

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
        return res.json({ status: 400 });
      }
      res.cookie('sessionId', session.identifier, {
        httpOnly: true,
        secure: env.isProd,
        domain,
        expires: new CustomDate().addDays(7).toDate(),
      });
      res.cookie('user', JSON.stringify({
        name: req.user.name,
        email: req.user.email,
        roles: req.user.roles,
        profileImage: req.user.profileImage,
      }));
      res.redirect(config.AUTH_CLIENT_URL);
    } catch (e) {
      next(e);
    }
  },
);

router.use((req, res) => {
  res.json({
    message: '✨ Authentication Portal for *.vighnesh153.com ✨',
  });
});

module.exports = router;
