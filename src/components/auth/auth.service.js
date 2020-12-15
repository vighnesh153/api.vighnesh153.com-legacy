const mongoose = require('mongoose');
const crypto = require('crypto');

const { CustomDate } = require('../../util');

async function getSession(loggedInUser) {
  const Session = mongoose.model('Session');

  return await Session.create({
    identifier: crypto.randomBytes(20).toString('hex'),
    userId: loggedInUser._id,
    roles: loggedInUser.roles,
    expiresAt: new CustomDate().addDays(7).toDate(),
  });
}

module.exports = {
  getSession,
};
