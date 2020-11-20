const readCrushFile = require('../functions/readCrushFile');
const writeCrushFile = require('../functions/writeCrushFile.js');

module.exports = async (req, res) => {
  const file = await readCrushFile();
  const idInt = parseInt(req.params.id, 10);
  const index = file.findIndex((item) => item.id === idInt);
  const newItem = { ...req.body };
  newItem.id = idInt;
  file[index] = newItem;
  await writeCrushFile(file);
  return res.status(200).json(newItem);
};
