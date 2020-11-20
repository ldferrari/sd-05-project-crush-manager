const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

module.exports = async (req, res) => {
  let file = await readFile('./crush.json', 'utf8');
  file = JSON.parse(file);
  res.status(200).json(file);
};
