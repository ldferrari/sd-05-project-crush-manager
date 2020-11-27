const email = require('./checkEmail');
const error = require('./error');
const password = require('./checkPassword');
const auth = require('../utilities/auth');

module.exports = {
  email,
  error,
  password,
  auth,
};
