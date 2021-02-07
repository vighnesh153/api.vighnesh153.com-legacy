const mongoose = require('mongoose');

const { Schema } = mongoose;

const Log = new Schema({
  message: {
    type: Schema.Types.String,
  },

  level: {
    type: Schema.Types.String,
    enum: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'],
  },

  timestamp: {
    type: Schema.Types.Date,
  },

  meta: {
    type: Schema.Types.Mixed,
  },
});

mongoose.model('Log', Log, 'logs');
