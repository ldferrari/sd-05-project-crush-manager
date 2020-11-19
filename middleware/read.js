const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

module.exports = async (req, res) => {
  let file = await readFile('./crush.json');
  file = await JSON.parse(file.toString('utf-8'));
  res.status(200).json(file);
};
