const fs = require('fs').promises;

const readCrushes = async () => {
  const crushes = await fs.readFile('crush.json', 'utf-8');
  return JSON.parse(crushes);
};

module.exports = async (req, res) => {
  const buscar = req.query.q;
  const crushes = await readCrushes();
  const resultadoBusca = crushes.filter((crush) => crush.name.includes(buscar));
  if (!resultadoBusca || resultadoBusca === '') {
    res.status(200).json(crushes);
  } else if (resultadoBusca.length === 0) {
    res.status(200).json([]);
  } else {
    res.status(200).json(resultadoBusca);
  }
};
