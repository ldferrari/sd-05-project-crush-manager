const login = require('./login');
const auth = require('./auth');
const validCrush = require('./validCrush');
const createCrush = require('./createCrush');
const getCrushById = require('./getCrushById');
const updateCrush = require('./updateCrush');
const deleteCrush = require('./deleteCrush');
const searchCrush = require('./searchCrush');

module.exports = {
  login,
  auth,
  validCrush,
  createCrush,
  getCrushById,
  updateCrush,
  deleteCrush,
  searchCrush,
};
