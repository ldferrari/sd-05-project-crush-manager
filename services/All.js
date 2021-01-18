// Promise = assincrono
const fs = require('fs').promises;

const ler = async () => {
  const getCrush = await fs.readFile('./crush.json', 'utf8');
  const obj = JSON.parse(getCrush);
  return obj;
};

const novo = async (req, res) => {
  const { name, age, date } = req.body;
  const esperaLer = await ler();
  const id = esperaLer.length + 1;
  const newCrush = [...esperaLer, { id, name, age, date }];
  fs.writeFile('./crush.json', JSON.stringify(newCrush));
  return res.status(201).json({ id, name, age, date });
};

module.exports = { ler, novo };
