const { isValidToken } = require('../services/validator.service');
const {
  NO_TOKEN,
  INVALID_TOKEN,
} = require('../dictionary/errors.dictionary');

module.exports = async (req, _res, next) => {
  try {
    const { headers } = await req;
    if (!headers.authorization) throw new Error(NO_TOKEN);
    if (!isValidToken(headers)) throw new Error(INVALID_TOKEN);
    next();
  } catch ({ message }) {
    next({ message });
  }
};
