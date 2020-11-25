const { readFile } = require('fs');
const { promissify } = require('util');

//realizou o require já promissificando
const readFilePromised = promissify(readFile);

const readCrushFile = async () => {
  const crush = await readFilePromised('crush.json', 'utf-8');
  return JSON.parse(crush);
};

module.exports = { readCrushFile };
