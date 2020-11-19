const logger = require('./logger');
const auth = require('./auth');
const checkCrush = require('./checkCrush');
const addCrush = require('./addCrush');
const findById = require('./findById');
const editCrush = require('./editCrush');
const deleteCrush = require('./deleteCrush');
const searchTerm = require('./searchTerm');
// const error = require('./error');

module.exports = {
  logger,
  auth,
  checkCrush,
  addCrush,
  findById,
  editCrush,
  deleteCrush,
  searchTerm,
  // error,
};
