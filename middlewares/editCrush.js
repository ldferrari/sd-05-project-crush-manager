// Referência:
// https://stackoverflow.com/questions/4689856/how-to-change-value-of-object-which-is-inside-an-array-using-javascript-or-jquer/45341595
// https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter
const readFile = require('../funcoes/readFile');
const writeFile = require('../funcoes/writeFile');

const editCrush = async (req, res) => {
  const { name, age, date } = req.body;
  const { id: stringId } = req.params;
  const id = parseInt(stringId, 10);
  try {
    const crushs = await readFile();
    const crushIndex = crushs.findIndex((crush) => crush.id === id);
    crushs[crushIndex] = { name, age, id, date };
    await writeFile(crushs);
    res.status(200).json({ id, name, age, date });
  } catch (err) {
    console.error('Erro: ', err);
  }
};

module.exports = editCrush;
