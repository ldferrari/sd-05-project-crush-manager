const { readCrush } = require('../services/crud');

module.exports = async (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);
  const arrayOfCrushes = await readCrush();
  const crushById = arrayOfCrushes.find((crush) => crush.id === idNumber);
  if (!crushById) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(crushById);
};
