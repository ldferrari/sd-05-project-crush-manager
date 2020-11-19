const rescue = require('express-rescue');

const { readCrushFile, addNewCrushOnFile } = require('../Services/index');

module.exports = rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const oldCrushes = await readCrushFile();
  const id = oldCrushes.length + 1;
  await addNewCrushOnFile(null, oldCrushes, { id, name, age, date });
  res.status(201).json({ id, name, age, date });
});
