const { readCrush, editCrush } = require('../services/crud');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushArray = await readCrush();
  // Difere do updateCrush a partir deste trecho
  const delCrush = crushArray.filter((crush) => crush.id !== id);
  await editCrush(delCrush);
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
