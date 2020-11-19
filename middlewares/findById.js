const { readCrushFile } = require('../services/addCrushFunctions');

module.exports = async (req, res) => {
  const { id } = req.params;
  const crushList = await readCrushFile();
  const idCrush = crushList.find((crush) => crush.id === id);
  if (!idCrush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(200).json(idCrush);
};
