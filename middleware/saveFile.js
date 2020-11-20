const readCrushFile = require('../functions/readCrushFile');
const writeCrushFile = require('../functions/writeCrushFile.js');

const createCrushIntoFile = async (input) => {
  const file = await readCrushFile();
  const proximoId = Math.max(...file.map((item) => item.id)) + 1;
  const clonedInput = { ...input };
  clonedInput.id = proximoId;
  file.push(clonedInput);
  await writeCrushFile(file);
  return clonedInput;
};

module.exports = async (req, res) => {
  const print = await createCrushIntoFile(req.body);
  res.status(201).json(print);
};

//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
