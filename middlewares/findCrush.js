const fs = require('fs').promises;

module.exports = async (req, res) => {
  // https://www.w3schools.com/jsref/jsref_parseInt.asp
  const myCrush = parseInt(req.params.id, 10);
  const myCrushes = await JSON.parse(fs.readFile('./crush.json', 'utf8'));
  const findMyCrush = myCrushes.find((crush) => crush.id === myCrush);

  return (!findMyCrush)
    ? res.status(404).json({ message: 'Crush não encontrado' })
    : res.status(200).json(findMyCrush);
};
