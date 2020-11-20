const auth = require('./auth');
const checkBodyStructure = require('./checkBodyStructure');
const del = require('./delete');
const login = require('./login');
const read = require('./read');
const saveFile = require('./saveFile');
const searchId = require('./searchId');
const searchTerm = require('./searchTerm');
const update = require('./update');

module.exports = {
  auth,
  checkBodyStructure,
  del,
  login,
  read,
  saveFile,
  searchId,
  searchTerm,
  update,
};
