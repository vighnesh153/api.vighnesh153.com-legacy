const mongoose = require('mongoose');

module.exports = function removeExpiredAdminTokens(agenda) {
  const AdminToken = mongoose.model('AdminToken');

  agenda.define('remove expired admin tokens', async () => {
    await AdminToken.deleteMany({ expiresAt: { $lte: new Date() } });
  });
};
