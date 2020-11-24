const readFiles = require('./readFiles');
const writeFiles = require('./writeFiles');

const exercicio06 = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const readCrushs = await readFiles();
  readCrushs.filter((element) => element.id !== id);
  await writeFiles(readCrushs);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = exercicio06;
