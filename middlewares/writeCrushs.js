const fs = require('fs');
const util = require('util');

const writeCrushs = util.promisify(fs.writeFile);

const writeCrushFile = async (file) => writeCrushs('./crush.json', JSON.stringify(file));

module.exports = writeCrushFile;
