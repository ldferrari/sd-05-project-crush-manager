const login = require('./login');
const authToken = require('./auth');
const validateCrush = require('./validateCrush');
const addNewCrush = require('./addNewCrush');
const getAllCrushes = require('./getAllCrushs.js');
const getCrushById = require('./getById');
const updateCrushById = require('./updateCrushById');
const deleteCrush = require('./deleteCrush');
const searchCrush = require('./searchCrush');

module.exports = {
  login,
  authToken,
  validateCrush,
  addNewCrush,
  getAllCrushes,
  getCrushById,
  updateCrushById,
  deleteCrush,
  searchCrush,
};
