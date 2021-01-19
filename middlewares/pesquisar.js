const { ler } = require('../services/All');

module.exports = async (req, res) => {
  const leitura = await ler();
  const busca = req.query;
  const filtroBusca = leitura.filter((crush) => crush.name.includes(busca));
  if (busca === true) {
    return res.status(200).json(filtroBusca);
  }
  return res.status(200).json(leitura);
};
