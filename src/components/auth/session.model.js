const mongoose = require('mongoose');

const { Schema } = mongoose;

const Session = new Schema({
  identifier: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  roles: {
    type: Schema.Types.Array,
    required: true,
    default: ['user'],
  },

  expiresAt: {
    type: Schema.Types.Date,
  },
});

mongoose.model('Session', Session, 'sessions');
