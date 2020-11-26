const readFile = require('../service/readFile');
const writeFile = require('../service/writeFile');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;

  try {
    const crushs = await readFile();
    const id = crushs.length + 1;
    await writeFile([...crushs, { id, name, age, date }]);
    res.status(201).json({ id, name, age, date });
  } catch (err) {
    throw err;
  }
};

module.exports = { createCrush };
