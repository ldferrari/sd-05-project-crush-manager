const generateToken = require('./generateToken');
const getAllCrushs = require('./getAllCrushs');
const validateEmail = require('./validadeEmail');
const validatePassword = require('./validatePassword');
const validateToken = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateDate = require('./validateDate');
const createCrush = require('./createCrush');
const getCrushById = require('./getCrushById');
const editCrush = require('./editCrush');

module.exports = {
  generateToken,
  getAllCrushs,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  createCrush,
  getCrushById,
  editCrush,
};
