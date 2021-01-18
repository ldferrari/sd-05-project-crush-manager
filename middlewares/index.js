const login = require('./login');
const auth = require('./auth');
const createCrush = require('./createCrush');
const readList = require('./readList');
const { novo } = require('../services/All');
const ler = require('../services/All');
const searchCrush = require('./searchCrush');

module.exports = {
  login,
  auth,
  readList,
  createCrush,
  ler,
  novo,
  searchCrush,
};
