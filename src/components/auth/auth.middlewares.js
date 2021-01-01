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
    const session = await AuthService.createSession(req.user);

    const expiresAt = new CustomDate()
      .addHours(config.SESSION_EXPIRY_HOURS)
      .toDate();
    const userInfo = {
      name: req.user.name,
      roles: req.user.roles,
      profileImage: req.user.profileImage,
    };
    res.cookie('sessionId', session.identifier, {
      httpOnly: true,
      secure: env.isProd,
      domain,
      signed: true,
      expires: expiresAt,
    });
    res.cookie('user', JSON.stringify(userInfo), {
      expires: expiresAt,
      domain,
    });
    res.redirect(`${config.AUTH_CLIENT_URL}?loginSuccess`);
  } catch (e) {
    next(e);
  }
}

function verifyLoginSuccess(req, res) {
  res.json({
    message: 'SUCCESS',
  });
}

function catchAllWildcardRouteHandler(req, res) {
  res.json({
    message: '✨ Authentication Portal for *.vighnesh153.com ✨',
  });
}

module.exports = {
  passportGithubAuth,
  passportGithubAuthCallback,
  githubSignupSuccess,
  verifyLoginSuccess,
  catchAllWildcardRouteHandler,
};
