const readFile = require('../funcoes/readFile');
const writeFile = require('../funcoes/writeFile');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;

  try {
    const currentCrushs = await readFile();
    const id = currentCrushs.length + 1;
    await writeFile([...currentCrushs, { name, age, id, date }]);
    res.status(201).json({ id, name, age, date });
  } catch (err) {
    console.error('Error:', err);
  }
};

module.exports = createCrush;
