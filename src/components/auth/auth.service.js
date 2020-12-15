const mongoose = require('mongoose');
const crypto = require('crypto');

const { CustomDate } = require('../../util');

class AuthService {
  static async getSession(loggedInUser) {
    const Session = mongoose.model('Session');

    if (loggedInUser.deletedAt !== null) {
      return null;
    }

    return await Session.create({
      identifier: crypto.randomBytes(20).toString('hex'),
      name: loggedInUser.name,
      email: loggedInUser.email,
      profileImage: loggedInUser.profileImage,
      roles: loggedInUser.roles,
      expiresAt: new CustomDate().addDays(7).toDate(),
    });
  }
}

module.exports = AuthService;
