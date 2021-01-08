const mongoose = require('mongoose');
const crypto = require('crypto');

const { CustomDate } = require('../../util');
const config = require('../../config');

async function createSession(loggedInUser) {
  const Session = mongoose.model('Session');

  return await Session.create({
    identifier: crypto.randomBytes(20).toString('hex'),
    userId: loggedInUser._id,
    roles: loggedInUser.roles,
    expiresAt: new CustomDate().addHours(config.SESSION_EXPIRY_HOURS).toDate(),
  });
}

module.exports = {
  createSession,
};
