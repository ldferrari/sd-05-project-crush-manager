const { ler } = require('../services/All');

module.exports = async (req, res) => {
  const crushId = await ler();
  const buscaId = crushId.find((crush) => parseInt(req.params.id, 10) === crush.id);
  if (buscaId) {
    res.status(200).json(buscaId);
  }
  res.status(404).json({ message: 'Crush não encontrado' });
};
