const {
  NO_NAME,
  NO_TOKEN,
  INVALID_NAME,
  NO_AGE,
  INVALID_AGE,
  INVALID_DATE_AT,
  INVALID_RATE,
  INVALID_TOKEN,
} = require('../dictionary/errors.dictionary');

const {
  isValidName,
  isValidAge,
  isValidDate,
  isValidDatedAt,
  isValidRate,
  isValidToken,
} = require('../services/validator.service');

const addCrush = async (req, _res, next) => {
  try {
    const { body, headers } = await req;
    const dateError = isValidDate(body);
    if (!body.name) throw new Error(NO_NAME);
    if (!body.age) throw new Error(NO_AGE);
    if (!headers.authorization) throw new Error(NO_TOKEN);
    if (dateError) throw new Error(dateError);
    if (!isValidDatedAt(body)) throw new Error(INVALID_DATE_AT);
    if (!isValidName(body)) throw new Error(INVALID_NAME);
    if (!isValidAge(body)) throw new Error(INVALID_AGE);
    if (!isValidRate(body)) throw new Error(INVALID_RATE);
    if (!isValidToken(headers)) throw new Error(INVALID_TOKEN);
    const { name, age, date } = body;
    req.crush = { name, age, date };
    next();
  } catch ({ message }) {
    next({ message });
  }
};

module.exports = {
  addCrush,
};
