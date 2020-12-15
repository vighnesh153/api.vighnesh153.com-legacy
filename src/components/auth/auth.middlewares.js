const passport = require('passport');
const AuthService = require('./auth.service');

const config = require('../../config');
const { CustomDate, env } = require('../../util');

const domain = env.isProd ? 'vighnesh153.com' : 'localhost';

const passportGithubAuth = passport.authenticate('github');

const passportGithubAuthCallback = passport.authenticate('github', {
  failureRedirect: config.AUTH_CLIENT_URL,
});

async function githubSignupSuccess(req, res, next) {
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
}

function verifyLoginSuccess(req, res) {
  res.json({
    message: 'Yes. You are logged in.',
  });
}

function wildcardRouteHandler(req, res) {
  res.json({
    message: '✨ Authentication Portal for *.vighnesh153.com ✨',
  });
}

module.exports = {
  passportGithubAuth,
  passportGithubAuthCallback,
  githubSignupSuccess,
  verifyLoginSuccess,
  wildcardRouteHandler,
};
