const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const createCrushIntoFile = async (input) => {
  let file = await readFile('./crush.json');
  file = await JSON.parse(file.toString('utf-8'));
  const proximoId = Math.max(...file.map((item) => item.id)) + 1;
  const clonedInput = { ...input };
  clonedInput.id = proximoId;
  file.push(clonedInput);
  await writeFile('./crush.json', JSON.stringify(file));
  return clonedInput;
};

module.exports = async (req, res) => {
  const print = await createCrushIntoFile(req.body);
  res.status(201).json(print);
};

//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
