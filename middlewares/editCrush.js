const fs = require('fs').promises;
const { ler } = require('../services/All');

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const id = parseInt(req.params.id, 10);
  const leitura = await ler();
  const qualCrush = leitura.find((crush) => crush.id !== id);
  leitura[qualCrush] = { id, name, age, date };
  fs.writeFile('./crush.json', JSON.stringify(leitura));
  return res.status(200).json({ id, name, age, date });
};
