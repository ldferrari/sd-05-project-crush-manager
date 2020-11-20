const loginChecker = require('./loginMiddleware');
const nameChecker = require('./nameCheckerMiddleware');
const ageChecker = require('./ageCheckerMiddleware');
const dateChecker = require('./dateCheckerMiddleware');
const tokenChecker = require('./tokenCheckerMiddleware');
const idChecker = require('./idCheckerMiddleware');

module.exports = {
  loginChecker,
  nameChecker,
  ageChecker,
  dateChecker,
  tokenChecker,
  idChecker,
};
