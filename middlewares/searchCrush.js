const rescue = require('express-rescue');
const fs = require('fs').promises;

module.exports = rescue(async (req, res) => {
  const { name, age, date: { datedAt, rate } } = req.body;
  const { id: stringID } = req.params;
  const id = parseInt(stringID, 10);

  const readFromFile = await fs.readFile('crush.json');
  const array = JSON.parse(readFromFile);

  const foundObject = array.find((obj) => obj.id === id);
  foundObject.name = name;
  foundObject.age = age;
  foundObject.date.datedAt = datedAt;
  foundObject.date.reate = rate;

  const index = array.findIndex((obj) => obj.id === id);
  // if (index === -1) res.status(404).json({ message: 'Pessoa não encontrada' });
  array[index] = foundObject;
  await fs.writeFile('crush.json', JSON.stringify(array));
  res.status(200).json(array[index]);
});
