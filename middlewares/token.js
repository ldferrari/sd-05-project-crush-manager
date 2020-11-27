const { token } = require('../enums');

const tokenPattern = new RegExp(/[a-z0-9]{16}/i);

const checkToken = (req, res, next) => {
  const { authorization = undefined } = req.headers;
  if (!authorization) {
    return res.status(401).json(token.notFound);
  }
  if (!tokenPattern.test(authorization)) {
    return res.status(401).json(token.isInvalid);
  }
  next();
};

module.exports = { checkToken };
