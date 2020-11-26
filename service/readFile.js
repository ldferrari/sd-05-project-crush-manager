const fs = require('fs');
const util = require('util');

// realizou o require já promissificando
const readFilePromised = util.promisify(fs.readFile);

const readCrushFile = async () => {
  const crush = await readFilePromised('crush.json', 'utf-8');
  return JSON.parse(crush);
};

module.exports = { readCrushFile };
