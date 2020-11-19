const { readCrushFile } = require('../services/addCrushFunctions');

module.exports = async (req, res) => {
  const { id } = Number(req.params);
  const crushList = await readCrushFile();
  const foundCrush = crushList.find((crush) => crush.id === id);
  if (!foundCrush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(foundCrush);
};
