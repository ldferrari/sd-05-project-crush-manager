const fs = require('fs');
const path = require('path');

const crushDB = fs.readFileSync(
  path.join(__dirname, '../crush.json'),
  'utf8');

const getCrushLastId = () => JSON
  .parse(crushDB)
  .reduce((id, current) => (id > current.id ? id : current.id), -1);

module.exports = {
  getCrushLastId,
};
