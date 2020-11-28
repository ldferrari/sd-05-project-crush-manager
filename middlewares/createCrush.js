const { readCrush, addCrush } = require('../services/crud');

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const newArrayOfCrushes = await readCrush();
  // increment id
  const id = newArrayOfCrushes.length + 1;
  addCrush(newArrayOfCrushes, { id, name, age, date });
  res.status(201).json({ id, name, age, date });
};
