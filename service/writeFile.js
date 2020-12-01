const fs = require('fs');
const util = require('util');

// promissifica a função writeFile
const writeFile = util.promisify(fs.writeFile);

const writeCrushFile = async (crushFile) => writeFile('crush.json', JSON.parse(crushFile));

module.exports = { writeCrushFile };
