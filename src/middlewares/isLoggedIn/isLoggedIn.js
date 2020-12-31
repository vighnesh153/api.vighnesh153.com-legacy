const mongoose = require('mongoose');

const clearCookies = (res) => {
  res.clearCookie('sessionId');
  res.clearCookie('user');
};

module.exports = async (req, res, next) => {
  const { sessionId } = req.signedCookies;
  if (!sessionId) {
    clearCookies(res);
    return res.json({
      status: 401,
      message: 'NOT_AUTHENTICATED',
    });
  }

  try {
    const Session = mongoose.model('Session');
    const session = await Session.findOne(
      {
        identifier: sessionId,
      },
      'userId expiresAt',
    ).exec();

    if (session === null) {
      // Invalid session ID
      clearCookies(res);
      return res.json({
        status: 400,
        message: 'BAD_REQUEST',
      });
    }

    const sessionExpiryDate = new Date(session.expiresAt);
    if (sessionExpiryDate < new Date()) {
      clearCookies(res);
      return res.json({
        status: 401,
        message: 'SESSION_EXPIRED',
      });
    }

    const User = mongoose.model('User');
    const user = await User.findOne({
      _id: session.userId,
    }).exec();

    if (user === null) {
      // Not sure if this will ever happen
      // because Session will never be created
      // with an invalid user_id
    }

    req.user = user;
    next();
  } catch (error) {
    error.isTrusted = true;
    next(error);
  }
};
