const mongoose = require('mongoose');

const { Schema } = mongoose;

const { collections } = require('../../enums');

const User = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'Name is required.'],
  },

  githubId: {
    type: Schema.Types.String,
    unique: true,
    required: [true, 'Github ID is required.'],
  },

  profileImage: {
    type: Schema.Types.String,
    required: [true, 'Profile Image URL is required.'],
  },

  roles: {
    type: Schema.Types.Array,
    default: ['user'],
  },

  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },

  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },

  deletedAt: {
    type: Schema.Types.Date,
    default: null,
  },
});

mongoose.model('User', User, collections.USERS);
