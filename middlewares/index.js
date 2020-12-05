const auth = require('./auth');
const error = require('./error');
const email = require('./checkEmail');
const password = require('./checkPassword');
const name = require('./checkName');
const age = require('./checkAge');
const date = require('./checkDate');
const getCrush = require('./getCrush');
const createCrush = require('./createCrush');
const getById = require('./getById');
const updateCrush = require('./updateCrush');
const deleteCrush = require('./deleteCrush');
const searchCrush = require('./searchCrush');

module.exports = {
  auth,
  error,
  email,
  password,
  name,
  age,
  date,
  getCrush,
  createCrush,
  getById,
  updateCrush,
  deleteCrush,
  searchCrush,
};
