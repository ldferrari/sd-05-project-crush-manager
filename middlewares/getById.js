const { readCrush } = require('../services/crud');

module.exports = async (req, res) => {
  const { id } = req.params;
  const idInt = parseInt(id, 10);
  const crushArray = await readCrush();
  const crush = crushArray.find((c) => c.id === idInt);
  if (!crush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(crush);
};
