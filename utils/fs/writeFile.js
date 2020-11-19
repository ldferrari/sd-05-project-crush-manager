const fs = require('fs').promises;
const path = require('path');

const readCrushs = require('./readFile');

const writeCrushs = async (file) => {
  await fs.writeFile(
    path.join(__dirname, '../../crush.json'),
    JSON.stringify(file),
    'utf8',
    (err) => err,
  );
  return readCrushs();
};

module.exports = writeCrushs;
