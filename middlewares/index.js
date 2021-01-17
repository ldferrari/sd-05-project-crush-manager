const login = require('./login');
const auth = require('./auth');
const createCrush = require('./createCrush');
// const readJSON = require('../services/allCrush');
const list = require('./list');
// const readList = require('./readList');
const { incrementCrush } = require('../services/allCrush');

module.exports = {
  login,
  auth,
  createCrush,
  list,
  incrementCrush,
  // readJSON,
};
