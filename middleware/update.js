const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = async (req, res) => {
  let file = await readFile('./crush.json', 'utf-8');
  file = await JSON.parse(file);
  const idInt = parseInt(req.params.id, 10);
  const index = file.findIndex((item) => item.id === idInt);
  const newItem = { ...req.body };
  newItem.id = idInt;
  file[index] = newItem;
  await writeFile('./crush.json', JSON.stringify(file));
  res.status(200).json(newItem);
};
