const fs = require('fs').promises;

const readCrushes = async () => {
  const crushes = await fs.readFile('crush.json', 'utf-8');
  return JSON.parse(crushes);
};

module.exports = async (req, res) => {
  const { name, age, date } = req.body;

  const { datedAt, rate } = req.body.date ? date : '';

  const data = await readCrushes();

  const findCrush = Number(req.params.id);

  const iCrush = data.findIndex((crush) => crush.id === Number(findCrush));
  if (!data[iCrush]) {
    return res.status(404).json({ message: 'Crush não existe' });
  }
  data[iCrush].name = name;
  data[iCrush].age = age;
  data[iCrush].date.datedAt = datedAt;
  data[iCrush].date.rate = rate;
  await fs.writeFile('crush.json', JSON.stringify(data), 'utf-8');
  res.status(200).json(data[iCrush]);
};
