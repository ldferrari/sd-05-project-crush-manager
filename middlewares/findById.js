const { readCrushFile } = require('../services/crudFunctions');

module.exports = async (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id, 10);
  // console.log(idNum);
  const crushList = await readCrushFile();
  const foundCrush = crushList.find((crush) => crush.id === idNum);
  if (!foundCrush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(foundCrush);
};
