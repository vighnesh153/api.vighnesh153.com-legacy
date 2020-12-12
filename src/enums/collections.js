const dbs = require('./dbs');

module.exports = {
  [dbs.AUTH]: {
    SESSIONS: 'sessions',
  },
  [dbs.GENERAL]: {
    USERS: 'users',
  },
};
