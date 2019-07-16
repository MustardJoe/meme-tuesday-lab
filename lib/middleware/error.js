const mongoose = require('mongoose');

//eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let status = err.status || 500;

  if(err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError) {
    status = 400;
  }

  res.send({
    jonMesg: 'you got the error messege',
    status,
    message: err.message
  });
};
