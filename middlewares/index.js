const logger = require('./logger');
const auth = require('./auth');
const checkCrush = require('./checkCrush');
const addCrush = require('./addCrush');
const findById = require('./findById');
const editCrush = require('./editCrush');
// const error = require('./error');

module.exports = {
  logger,
  auth,
  checkCrush,
  addCrush,
  findById,
  editCrush,
  // error,
};
