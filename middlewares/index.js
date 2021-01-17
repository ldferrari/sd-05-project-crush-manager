const login = require('./login');
const auth = require('./auth');
const createCrush = require('./createCrush');
// const readJSON = require('../services/allCrush');
const list = require('./list');
const { incrementCrush } = require('../services/allCrush');
const crushIdFind = require('./crushIdFind');

module.exports = {
  login,
  auth,
  createCrush,
  list,
  incrementCrush,
  crushIdFind,
  // readJSON,
};
