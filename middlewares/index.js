const auth = require('./auth');
const error = require('./error');
const logger = require('./logger');
const editCrush = require('./editCrush');
const searchCrush = require('./searchCrush');
const deleteCrush = require('./deleteCrush');
const createCrush = require('./createCrush');
const getAllCrushs = require('./getAllCrushs');
const getCrushById = require('./getCrushById');

module.exports = {
  auth,
  error,
  logger,
  editCrush,
  searchCrush,
  deleteCrush,
  createCrush,
  getAllCrushs,
  getCrushById,
};
