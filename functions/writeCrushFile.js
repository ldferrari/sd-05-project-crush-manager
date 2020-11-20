const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const writeCrushFile = async (file) => writeFile('./crush.json', JSON.stringify(file));

module.exports = writeCrushFile;
