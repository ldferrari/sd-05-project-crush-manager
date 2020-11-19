const login = require('./login');
const authToken = require('./auth');
const validateCrush = require('./validateCrush');
const addNewCrush = require('./addNewCrush');
const getAllCrushes = require('./getAllCrushs.js');
const getCrushById = require('./getById');

module.exports = {
  login,
  authToken,
  validateCrush,
  addNewCrush,
  getAllCrushes,
  getCrushById,
};
