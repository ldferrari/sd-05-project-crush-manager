const fs = require('fs');
const util = require('util');

const readCrushs = util.promisify(fs.readFile);

module.exports = async (req, res) => {
  let file = await readCrushs('./crush.json', 'utf8');
  file = JSON.parse(file);
  res.status(200).json(file);
};
