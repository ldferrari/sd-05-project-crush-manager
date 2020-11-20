const fs = require('fs').promises;
const path = require('path');
const { readCrush } = require('./readCrush');

const deleteCrushById = async (id) => {
  const file = await readCrush();
  const newFile = file.filter((crush) => crush.id !== parseInt(id, 10));
  console.log(newFile);
  return fs.writeFile(path.resolve(__dirname, '../crush.json'), JSON.stringify(newFile, null, 2), 'utf-8');
};
module.exports = {
  deleteCrushById,
};
