const fs = require('fs').promises;
const path = require('path');

const readCrushes = async () => {
  const list = await fs.readFile((path.resolve(__dirname, '..', 'crush.json')), 'utf8', (err, _data) => {
    if (err) console.log('erro no read');
    console.log('lido a Lista');
  });
  return JSON.parse(list.toString('utf-8'));
};

const newCrushAdd = async (req, res) => {
  try {
    const { name, age, date } = req.body;
    // console.log(name, age);
    const originalCrushes = await readCrushes();
    const id = originalCrushes.lenght + 1;
    console.log(id);
    const newCrush = { id, name, age, date };
    console.log(newCrush);
    const newList = [...originalCrushes, newCrush];
    console.log(newList);
    fs.writeFile((path.resolve(__dirname, '..', 'crush.json')), JSON.stringify(newList), (err, _data) => {
      if (err) throw('alguma coisa', err.message);
      console.log('adicionado novo crush');
    });
    res.status(201).json({ id, name, age, date });
  } catch (error) {
    console.log('linha30');
  }
};

module.exports = newCrushAdd;
