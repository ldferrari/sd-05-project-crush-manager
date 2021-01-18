const fs = require('fs').promises;
const { readJSON } = require('../services/allCrush');

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const id = parseInt(req.params.id, 10);
  const newArry = await readJSON();
  const findCrush = newArry.find((crush) => crush.id === id);
  newArry[findCrush] = { id, name, age, date };
  fs.writeFile('./crush.json', JSON.stringify(newArry));
  return res.status(200).json({ id, name, age, date });
};
