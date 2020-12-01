const { readFileCrush } = require('../service/readFile');
const { writeCrushFile } = require('../service/writeFile');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;

  try {
    const crushs = await readFileCrush();
    const id = crushs.length + 1;

    await writeCrushFile([...crushs, { name, age, id, date }]);
    res.status(201).json({ name, age, id, date });
  } catch (err) {
    console.error('Error: ', err);
  }
};

module.exports = { createCrush };
