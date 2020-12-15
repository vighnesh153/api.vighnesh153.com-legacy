module.exports = (req, res, next) => {
  console.log(JSON.stringify(req.cookies));
  console.log(JSON.stringify(req.signedCookies));

  res.json({
    message: 'Hello',
  });
};
