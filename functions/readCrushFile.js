const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const readCrushFile = async () => {
  const file = await readFile('./crush.json', 'utf8');

  return JSON.parse(file);
};

module.exports = readCrushFile;
