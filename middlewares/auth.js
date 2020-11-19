const rescue = require('express-rescue');

const auth = rescue(async (req, res, next) => {
  console.log(req.body);
  next();
});

module.exports = auth;
