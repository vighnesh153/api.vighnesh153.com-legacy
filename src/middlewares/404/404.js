module.exports = function handle404(req, res) {
  res.status(404).json({
    message:
      '✨✨✨👻👻👻 Oops. You are not supposed to be here. GO AWAY!!! or I will hack your computer using HTML 👻👻👻✨✨✨',
  });
};
