module.exports = (req, res, next) => {
  const err = new Error('File Not Found... maybe check the path?');
  err.status = 404;
  next(err);
};
