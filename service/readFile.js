const fs = require('fs');
const util = require ('util');


const readFile = util.promisify(fs.readFile);

const readCrushFile = async () => {
  const crushFile = await readFile('crush.json', 'utf-8');

  return JSON.parse(crushFile)
}
module.exports = { readCrushFile };
