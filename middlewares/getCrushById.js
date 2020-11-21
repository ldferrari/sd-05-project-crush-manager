const readFile = require('../funcoes/readFile');

const getCrushById = async (req, res) => {
  const { id: stringId } = req.params;
  const numericId = parseInt(stringId, 10);
  try {
    const crushs = await readFile();
    const selectedCrush = crushs.find((crush) => crush.id === numericId);
    if (!selectedCrush) {
      res.status(404).json({ message: 'Crush não encontrado' });
    } else {
      res.status(200).json(selectedCrush);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = getCrushById;
