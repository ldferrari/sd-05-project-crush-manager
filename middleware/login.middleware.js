const {
  generateToken,
  isValidEmail,
  isValidPassword,
} = require('../services/validator.service');

const {
  NO_EMAIL,
  NO_PASS,
  INVALID_EMAIL,
  INVALID_PASS,
} = require('../dictionary/errors.dictionary');

module.exports = async (req, _res, next) => {
  try {
    const { body } = await req;
    if (!body.email) throw new Error(NO_EMAIL);
    if (!body.password) throw new Error(NO_PASS);
    if (!isValidEmail(body)) throw new Error(INVALID_EMAIL);
    if (!isValidPassword(body)) throw new Error(INVALID_PASS);
    req.token = generateToken(body);
    next();
  } catch ({ message }) {
    next({ message });
  }
};
