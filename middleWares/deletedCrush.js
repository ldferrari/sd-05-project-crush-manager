const fs = require('fs').promises;

const readCrushs = async () => {
  const crushs = await fs.readFile('crush.json', 'utf-8', (err) => {
    if (err) throw console.log('não dá mais');
  });
  return JSON.parse(crushs);
};

const writeCrushs = async (crush) => {
  fs.writeFile('crush.json', JSON.stringify(crush), (err) => {
    if (err) throw console.log(`Deleta se não eu choro ${err}`);
  });
};

module.exports = async (req, res) => {
  const results = await readCrushs();
  const id = Number(req.params.id);
  const filteredCrush = results.filter((crush) => crush.id !== id);

  await writeCrushs('./crush.json', filteredCrush);

  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
