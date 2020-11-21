const readFile = require('../funcoes/readFile');
const writeFile = require('../funcoes/writeFile');

const deleteCrush = async (req, res) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId, 10);
  try {
    const crushs = await readFile();
    const crushIndex = crushs.findIndex((crush) => crush.id === id);
    crushs.splice(crushIndex, 1);
    await writeFile(crushs);
    res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (err) {
    console.error('Erro ', err);
  }
};

module.exports = deleteCrush;
