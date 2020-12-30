const mongoose = require('mongoose');

module.exports = function removeExpiredSessions(agenda) {
  const Session = mongoose.model('Session');

  agenda.define('remove expired sessions', async () => {
    await Session.remove({ expiresAt: { $lte: new Date() } });
  });
};
