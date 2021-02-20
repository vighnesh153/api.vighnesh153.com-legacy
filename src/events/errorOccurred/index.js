const event = require('./emitter');

require('./subscribers');

module.exports = function emit({ message, stackTrace }) {
  event.emit({ message, stackTrace });
};
