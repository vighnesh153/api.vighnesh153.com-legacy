module.exports = function errorHandler(err, req, res, next) {
  if (err.isTrusted) {
    // TODO: Do something and return
    return;
  }
  if (err.code === 'EBADCSRFTOKEN') {
    // TODO: Do something and return
    console.log(err.code);
    return;
  }
  // TODO: Do something or crash as it is not a
  //  trusted error
  console.log(err);
};
