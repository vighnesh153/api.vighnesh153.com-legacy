const mongoose = require('mongoose');

const { Schema } = mongoose;

const { collections } = require('../../enums');

const Session = new Schema({
  identifier: {
    type: Schema.Types.String,
    required: true,
  },

  name: {
    type: Schema.Types.String,
    required: true,
  },

  email: {
    type: Schema.Types.String,
    required: [true, 'Email is required.'],
  },

  profileImage: {
    type: Schema.Types.String,
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

mongoose.model('Session', Session, collections.SESSIONS);
