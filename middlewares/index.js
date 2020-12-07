const auth = require('./auth');
const validate = require('./validate');
const criarCrush = require('./criarCrush');
const validaEmail = require('./validaEmail');
const readCrushes = require('./readCrushes');
const updateCrush = require('./updateCrush');
const deleteCrush = require('./deleteCrush');
const searchCrush = require('./searchCrush');
const validaPassword = require('./validaPassword');
const searchCrushById = require('./searchCrushById');

module.exports = {
  auth,
  validate,
  criarCrush,
  validaEmail,
  readCrushes,
  updateCrush,
  deleteCrush,
  searchCrush,
  validaPassword,
  searchCrushById,
};
