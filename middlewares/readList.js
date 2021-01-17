const { ler } = require('../services/All');

module.exports = async (_, res) => {
  const lista = await ler();
  if (!lista) {
    return res.status(200).json([]);
  }
  if (lista) {
    return res.status(200).json(lista);
  }
};
