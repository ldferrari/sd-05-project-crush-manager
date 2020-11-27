const login = require('./login');
const crush = require('./crush');
const token = require('./token');
const handleCrush = require('./handleCrush');

module.exports = {
  ...login,
  ...crush,
  ...token,
  ...handleCrush,
};
