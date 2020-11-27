const auth = require('./auth');
const criarCrush = require('./criarCrush');
const validaEmail = require('./validaEmail');
const readCrushes = require('./readCrushes');
const searchCrushById = require('./searchCrushById');
const validaPassword = require('./validaPassword');

module.exports = {
  auth,
  criarCrush,
  validaEmail,
  readCrushes,
  searchCrushById,
  validaPassword,
};
