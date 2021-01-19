const Agenda = require('agenda');

const config = require('../config');

const removeExpiredSessions = require('./removeExpiredSessions');
const removeExpiredAdminTokens = require('./removeExpiredAdminTokens');

const jobs = [
  {
    name: 'remove expired sessions',
    definer: removeExpiredSessions,
    interval: '24 hours',
  },
  {
    name: 'remove expired admin tokens',
    definer: removeExpiredAdminTokens,
    interval: '24 hours',
  },
];

module.exports = async function configureJobs() {
  const agenda = new Agenda({
    db: {
      address: config.MONGODB_URI,
      collection: 'agendaJobs',
      options: {
        useUnifiedTopology: true,
      },
    },
  });

  jobs.forEach(({ definer }) => {
    definer(agenda);
  });

  await agenda.start();

  for (const job of jobs) {
    await agenda.every(job.interval, job.name);
  }
};
