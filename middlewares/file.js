const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const createCrush = async (input) => {
  let file = await readFile('./crush.json', 'utf8');
  file = JSON.parse(file);
  const nextId = Math.max(...file.map((item) => item.id)) + 1;
  const copyInput = { ...input };
  copyInput.id = nextId;
  file.push(copyInput);
  await writeFile('./crush.json', JSON.stringify(file));
  return copyInput;
};

module.exports = async (req, res) => {
  const print = await createCrush(req.body);
  res.status(201).json(print);
};
