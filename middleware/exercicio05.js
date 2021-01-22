const readFiles = require('./readFiles');
const writeFiles = require('./writeFiles');

const exercicio05 = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const editCrush = req.body;
  const readCrushs = await readFiles();
  const idFind = readCrushs.findIndex((element) => element.id === id);
  readCrushs[idFind] = { ...editCrush, id };
  await writeFiles(readCrushs);
  res.status(200).json(readCrushs[idFind]);
};

module.exports = exercicio05;
