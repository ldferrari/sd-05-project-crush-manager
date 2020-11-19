const { readCrushFile, editCrushFile } = require('../services/crudFunctions');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Também possivel escrever assim:
  // const { id: stringId } = req.params;
  // const id = parseInt(stringId);
  const crushList = await readCrushFile();
  // const crushToDelete = crushList.find((crush) => crush.id === id);
  // if (!crushToDelete) {
  //   return res.status(404).json({ message: 'Crush não encontrado' });
  // }
  // Etapa do delete
  const shorterCrushList = crushList.filter((crush) => crush.id !== id);
  await editCrushFile(shorterCrushList);
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
