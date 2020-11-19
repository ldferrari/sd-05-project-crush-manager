const { MD5 } = require('crypto-js');
const { NO_DATE } = require('../dictionary/errors.dictionary');

const generateToken = ({ email }) => MD5(email).toString().substr(0, 16);
const isValidEmail = ({ email }) => email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i);
const isValidPassword = ({ password }) => password.toString().length >= 6;
const isValidName = ({ name }) => name.length >= 3;
const isValidAge = ({ age }) => Number(age) >= 18;
const isValidRate = ({ date: { rate } }) => rate > 0 && rate <= 5;
const isValidToken = ({ authorization }) => authorization.length === 16;
const isValidDate = ({ date }) => {
  if (typeof date !== 'object') return NO_DATE;
  if (!date.datedAt) return NO_DATE;
  if (!Object.keys(date).includes('rate')) return NO_DATE;
  return null;
};
const isValidDatedAt = ({ date: { datedAt } }) => datedAt.match(/\d{2}\/\d{2}\/\d{4}/ig)
  && datedAt.length === 10;

module.exports = {
  generateToken,
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidAge,
  isValidRate,
  isValidToken,
  isValidDate,
  isValidDatedAt,
};
