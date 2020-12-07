const fs = require('fs').promises;

const readCrushes = async () => {
  const crushes = await fs.readFile('crush.json', 'utf-8', (error) => {
    if (error) throw console.log('Algo deu errado');
  });
  return JSON.parse(crushes);
};

const writeCrushes = async (crush) => {
  fs.writeFile('crush.json', JSON.stringify(crush), (err) => {
    if (err) throw console.log('O crush não foi deletado');
  });
};

module.exports = async (req, res) => {
  const data = await readCrushes();
  const id = Number(req.params.id);
  const crushFiltrado = data.filter((crush) => crush.id !== id);
  await writeCrushes('crush.json', crushFiltrado);
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
