const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  const Session = mongoose.model('Session');

  const { sessionId } = req.signedCookies;
  if (!sessionId) {
    return res.json({
      status: 401,
      message: 'NOT_AUTHENTICATED',
    });
  }

  try {
    const session = await Session.findOne({
      identifier: sessionId,
    }).exec();

    const sessionExpiryDate = new Date(session.expiresAt);
    if (sessionExpiryDate < new Date()) {
      return res.json({
        status: 401,
        message: 'NOT_AUTHENTICATED',
      });
    }

    const User = mongoose.model('User');
    req.user = await User.findOne({
      _id: session.userId,
    }).exec();

    next();
  } catch (error) {
    error.isTrusted = true;
    next(error);
  }
};
