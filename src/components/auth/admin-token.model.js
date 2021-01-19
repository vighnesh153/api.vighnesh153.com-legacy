const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminToken = new Schema({
  identifier: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },

  expiresAt: {
    type: Schema.Types.Date,
  },
});

mongoose.model('AdminToken', AdminToken, 'adminTokens');
