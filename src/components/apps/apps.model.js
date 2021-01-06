const mongoose = require('mongoose');

const { Schema } = mongoose;

const App = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, 'Name is required.'],
  },

  url: {
    type: Schema.Types.String,
    required: [true, 'URL is required.'],
  },

  description: {
    type: Schema.Types.String,
    required: [true, 'Description is required.'],
  },

  priority: {
    type: Schema.Types.Number,
    required: [true, 'Priority is required.'],
  },
});

mongoose.model('App', App, 'apps');
