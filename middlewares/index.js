const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateDate = require('./validateDate');
const auth = require('./auth');

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateDate,
  auth,
};
