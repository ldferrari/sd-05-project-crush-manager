const {
  NO_NAME,
  NO_TOKEN,
  INVALID_NAME,
  NO_AGE,
  INVALID_AGE,
  NO_DATE,
  INVALID_DATE_AT,
  INVALID_RATE,
  INVALID_TOKEN,
} = require('../dictionary/errors.dictionary');

const isValidName = ({ name }) => name.length >= 3;
const isValidAge = ({ age }) => Number(age) >= 18;
const isValidDate = ({ date }) => {
  if (typeof date !== 'object') return NO_DATE;
  if (!date.datedAt) return NO_DATE; 
  if (!date.rate) return NO_DATE
  return null;
};
const isValidDatedAt = ({ date: { datedAt } }) => datedAt.match(/\d{2}\/\d{2}\/\d{4}/ig)
  && datedAt.length === 10;
const isValidRate = ({ date: { rate } }) => rate > 0 && rate <= 5;
const isValidToken = ({ authorization }) => authorization.length === 16;

module.exports = async (req, _res, next) => {
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
    req.crush = { id: 5, name, age, date };
    next();
  } catch ({ message }) {
    next({ message });
  }
};
