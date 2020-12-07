const { readFileCrush } = require('../models/readFile');
const { writeCrushFile } = require('../models/writeFile');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;
  const { datedAt, rate } = req.body.date;

  try {
    const crushs = await readFileCrush();
    const id = crushs.length + 1;

    await writeCrushFile([...crushs, { name, age, id, date, datedAt, rate }]);
    res.status(201).json({ name, age, id, date, datedAt, rate });
  } catch (err) {
    console.error('Error: ', err);
  }
};

module.exports = { createCrush };
