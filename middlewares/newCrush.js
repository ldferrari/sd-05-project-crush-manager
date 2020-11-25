const { readCrush, addCrush } = require('../services/crud');

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const newCrushArray = await readCrush();
  const id = newCrushArray.length + 1;
  addCrush(newCrushArray, { id, name, age, date });
  res.status(201).json({ id, name, age, date });
};

// Ponto de atenção INCREMENTAR o id 'manualmente'
