const auth = require('./auth');
const error = require('./error');
const logger = require('./logger');
const createCrush = require('./createCrush');
const getAllCrushs = require('./getAllCrushs');
const getCrushById = require('./getCrushById');

module.exports = {
  auth,
  error,
  logger,
  createCrush,
  getAllCrushs,
  getCrushById,
};
