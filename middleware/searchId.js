const readCrushFile = require('../functions/readCrushFile');

module.exports = async (req, res) => {
  const file = await readCrushFile();
  const resposta = file.filter((item) => item.id === parseInt(req.params.id, 10));
  if (resposta.length === 0) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(resposta[0]);
};
