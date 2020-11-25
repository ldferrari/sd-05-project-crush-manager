const { promisify } = require('util');
const { writeFile } = require('fs');

// promissifica a função writeFile
const writeFilePromised = promisify(writeFile);

const writeCrushFile = async (crush) => writeFilePromised('crush.json', JSON.parse(crush));

module.exports = { writeCrushFile };
