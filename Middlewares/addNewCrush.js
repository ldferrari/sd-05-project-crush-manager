const { readCrushFile, addNewCrushOnFile } = require('../Services/index');

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const oldCrushes = await readCrushFile();
  const id = oldCrushes.length + 1;
  addNewCrushOnFile(null, oldCrushes, { id, name, age, date });
  res.status(201).json({ id, name, age, date });
};
