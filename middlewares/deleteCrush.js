const { readCrush } = require('../utilities/readCrush');
const { writeCrush } = require('../utilities/writeCrush');

const crushPath = 'crush.json';

module.exports = async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(await readCrush(crushPath));
  const filteredCrushs = data.filter((crush) => crush.id !== parseInt(id, 10));
  writeCrush(filteredCrushs);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};
