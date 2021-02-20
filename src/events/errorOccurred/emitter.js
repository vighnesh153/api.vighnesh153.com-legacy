const { Subject } = require('rxjs');

const emitter = new Subject();

exports.emit = function emit({ message, stackTrace }) {
  emitter.next({ message, stackTrace });
};

exports.subscribe = function subscribe(cb) {
  return emitter.subscribe(cb);
};
