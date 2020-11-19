const { readCrushFile, writeCrushFile } = require('../services/addCrushFunctions');

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const currentCrushList = await readCrushFile();
  const id = currentCrushList.length + 1;
  writeCrushFile(currentCrushList, { id, name, age, date });
  res.status(201).json({ id, name, age, date });
  // console.log(`New crush should appear: ${req.body}`);
};
