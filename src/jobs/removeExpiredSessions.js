const mongoose = require('mongoose');

module.exports = function removeExpiredSessions(agenda) {
  const Session = mongoose.model('Session');

  agenda.define('remove expired sessions', async () => {
    await Session.deleteMany({ expiresAt: { $lte: new Date() } });
  });
};
