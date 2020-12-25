const mongoose = require("mongoose");
const passport = require("passport");

const GitHubStrategy = require("passport-github").Strategy;

const config = require("../../config");

function isAdminProfile(profile) {
  return profile.username === config.GITHUB_ADMIN_USERNAME;
}

function formatUserProfile(profile) {
  const newUser = {
    name: profile.displayName || profile.username,
    githubId: profile.id,
    profileImage: profile.photos[0].value,
    roles: ["user"],
  };
  if (isAdminProfile(profile)) {
    newUser.roles.push("admin");
  }
  return newUser;
}

function configureGithubStrategy() {
  const User = mongoose.model("User");

  const githubStrategyOptions = {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: `${config.HOST_URL}/auth/github/callback`,
  };

  passport.use(
    "github",
    new GitHubStrategy(
      githubStrategyOptions,
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await User.findOne({ githubId: profile.id }).exec();
          if (user !== null) {
            cb(null, user);
            return;
          }
          const newUserDraft = formatUserProfile(profile);
          cb(null, await User.create(newUserDraft));
        } catch (e) {
          cb(e, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.githubId);
  });

  passport.deserializeUser(async (githubId, done) => {
    try {
      const filters = { githubId };
      const user = await User.findOne(filters).exec();
      done(null, user);
    } catch (e) {
      done(e, null);
    }
  });
}

module.exports = configureGithubStrategy;
