const { readCrush } = require('../services/crud');
const updateCrush = require('./updateCrush');

module.exports = async (req, res) => {
  const idNumber = Number(req.params.id);
  const arrayOfCrushes = await readCrush();
  const crushIndex = arrayOfCrushes.findIndex((crush) => crush.id === idNumber);
  const newArray = [...arrayOfCrushes];
  newArray.splice(crushIndex, 1);
  console.log(newArray);
  await updateCrush(newArray);
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
