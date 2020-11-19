const { MD5 } = require('crypto-js');
const {
  NO_EMAIL,
  NO_PASS,
  INVALID_EMAIL,
  INVALID_PASS,
} = require('../dictionary/errors.dictionary');

const isValidEmail = ({ email }) => email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i);
const isValidPassword = ({ password }) => password.toString().length >= 6;

module.exports = async (req, _res, next) => {
  try {
    const { body } = await req;
    if (!body.email) throw new Error(NO_EMAIL);
    if (!body.password) throw new Error(NO_PASS);
    if (!isValidEmail(body)) throw new Error(INVALID_EMAIL);
    if (!isValidPassword(body)) throw new Error(INVALID_PASS);
    req.token = MD5(body.email).toString().substr(0, 16);
    next();
  } catch ({ message }) {
    next({ message });
  }
};
