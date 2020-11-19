const fs = require('fs');
const path = require('path');

const crushDB = fs.readFileSync(
  path.join(__dirname, '../crush.json'),
  'utf8',
);

const getCrushDB = async () => JSON.parse(await crushDB);

const getCrushById = async (id) => JSON
  .parse(await crushDB)
  .filter(({ id: crushId }) => Number(crushId) === Number(id));

const getCrushLastId = () => JSON
  .parse(crushDB)
  .reduce((id, current) => (id > current.id ? id : current.id), -1);

module.exports = {
  getCrushDB,
  getCrushById,
  getCrushLastId,
};
