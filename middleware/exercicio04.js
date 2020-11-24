const readFiles = require('./readFiles');

const exercicio04 = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const readCrushs = await readFiles();
  const idFind = readCrushs.find((element) => element.id === id);
  res.status(200).json(idFind);
};

module.exports = exercicio04;
