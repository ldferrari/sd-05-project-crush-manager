const fs = require('fs').promises;

const readCrushes = async () => {
  const crushes = await fs.readFile('crush.json', 'utf-8', (error) => {
    if (error) throw console.log('Nenhum crush encontrado');
  });
  return JSON.parse(crushes);
};

const writeCrushes = async (crush) => {
  fs.writeFile('crush.json', JSON.stringify(crush), (error) => {
    if (error) throw error;
  });
};

module.exports = async (req, res) => {
  const currentCrushes = await readCrushes();
  const newCrushes = [...currentCrushes, { ...req.body, id: currentCrushes.length + 1 }];
  await writeCrushes(newCrushes);
  return res.status(201).json({ ...req.body, id: currentCrushes.length + 1 });
};
