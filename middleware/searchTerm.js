const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

module.exports = async (req, res) => {
  const { q } = req.query;
  let file = await readFile('./crush.json', 'utf8');
  file = JSON.parse(file);
  if (!q) {
    return res.status(200).json(file);
  }
  return res.status(200).json(file.filter(({ name }) => name.includes(q)));
};
