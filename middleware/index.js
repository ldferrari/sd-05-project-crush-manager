const auth = require('./auth');
const login = require('./login');
const create = require('./create');
const saveFile = require('./saveFile');
const read = require('./read');
const searchId = require('./searchId');
const update = require('./update');
const del = require('./delete');
const searchTerm = require('./searchTerm');

module.exports = {
  auth,
  login,
  create,
  saveFile,
  read,
  searchId,
  update,
  del,
  searchTerm,
};
