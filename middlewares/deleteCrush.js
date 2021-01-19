const fs = require('fs').promises;
const { ler } = require('../services/All');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const apagar = await ler();
  const deletar = apagar.filter((crush) => crush.id !== id);
  fs.writeFile('./crush.json', JSON.stringify(deletar));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
