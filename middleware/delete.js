const readCrushFile = require('../functions/readCrushFile');
const writeCrushFile = require('../functions/writeCrushFile.js');

module.exports = async (req, res) => {
  const { id } = req.params;

  const file = await readCrushFile();
  const saida = file.filter((item) => item.id !== parseInt(id, 10));

  await writeCrushFile(saida);

  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
