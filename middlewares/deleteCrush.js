const { readCrush, createCrush } = require('../services/crud');

module.exports = async (req, res) => {
  const idNumber = Number(req.params.id);
  const arrayOfCrushes = await readCrush();
  const crushIndex = arrayOfCrushes.findIndex((crush) => crush.id === idNumber);
  const newArray = [...arrayOfCrushes];
  newArray.splice(crushIndex, 1);
  await createCrush(newArray);
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
