const { readFileCrush } = require('../models/readFile');
const { writeCrushFile } = require('../models/writeFile');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;

  try {
    const crushs = await readFileCrush();
    const id = crushs.length + 1;

    await writeCrushFile([...crushs, { name, age, id, date }]);
    res.status(201).json({ name, age, id, date });
  } catch (err) {
    res.send('Não vai rolar');
  }
};

module.exports = { createCrush };
