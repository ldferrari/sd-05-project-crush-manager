const login = require('./login');
const auth = require('./auth');
const createCrush = require('./createCrush');
const readList = require('./readList');
const { novo } = require('../services/All');
const ler = require('../services/All');

module.exports = {
  login,
  auth,
  readList,
  createCrush,
  ler,
  novo,
};
