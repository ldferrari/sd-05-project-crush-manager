const create = require('./create');
const read = require('./read');
const update = require('./update');
const remove = require('./delete');

module.exports = { create, read, update, delete: remove };
