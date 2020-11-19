const { readCrushFile, writeCrushFile } = require('../services/addCrushFunctions');

module.exports = async (req, res) => {
  // Inicia igual findById
  const id = parseInt(req.params.id, 10);
  // tem que ser id para nao aparecer chave idNum no crush editado
  // const { id } = req.params;
  // const idNum = parseInt(id, 10);
  const crushList = await readCrushFile();
  const foundCrush = crushList.find((crush) => crush.id === id);
  if (!foundCrush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  // Etapa do update do crush achado
  const { name, age, date } = req.body;
  const iCrush = crushList.indexOf(foundCrush);
  crushList[iCrush] = { id, name, age, date };
  await writeCrushFile(crushList);
  return res.status(200).json({ id, name, age, date });
};
