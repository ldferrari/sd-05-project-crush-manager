const { readCrush, editCrush } = require('../services/crud');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushArray = await readCrush();
  const crush = crushArray.find((c) => c.id === id);
  // Difere do getById a partir deste trecho
  const { name, age, date } = req.body;
  const upCrush = crushArray.indexOf(crush);
  crushArray[upCrush] = { id, name, age, date };
  await editCrush(crushArray);
  return res.status(200).json({ id, name, age, date });
};
