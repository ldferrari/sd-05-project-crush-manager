const auth = require('./auth');
const CrushValidate = require('./CrushValidate');
const newCrushAdd = require('./newCrushAdd');
const getAllCrushs = require('./getAllCrushs');
const getOneCrush = require('./getOneCrush');
const editCrush = require('./editCrush');
const deleteCrush = require('./deleteCrush');
const queryCrushs = require('./queryCrushs');

module.exports = {
  auth,
  CrushValidate,
  newCrushAdd,
  getAllCrushs,
  getOneCrush,
  editCrush,
  deleteCrush,
  queryCrushs,
};
