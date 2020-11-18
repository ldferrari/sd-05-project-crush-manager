const fs = require('fs').promises;
const path = require('path');

const readCrushs = async () => {
  const file = await fs.readFile(
    path.join(__dirname, '..', 'crush.json'),
    'utf8',
    (err, data) => {
      if (err) return err;
      return data;
    },
  );
  return JSON.parse(file);
};

const writeCrushs = async (file) => {
  await fs.writeFile(
    path.join(__dirname, '..', 'crush.json'),
    JSON.stringify(file),
    'utf8',
    (err) => err,
  );
  return readCrushs();
};

module.exports = {
  writeCrushs,
  readCrushs,
};
