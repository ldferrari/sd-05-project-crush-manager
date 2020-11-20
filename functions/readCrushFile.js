const fs = require('fs');
const util = require('util');
// const rescue = require('express-rescue');

const readFile = util.promisify(fs.readFile);

const readCrushFile = async () => {
  const file = await readFile('./crush.json', 'utf8');

  // if (!file) {
  //   throw new CrushFileReadError;
  // }

  return JSON.parse(file);
};

module.exports = readCrushFile;
