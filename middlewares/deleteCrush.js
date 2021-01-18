const fs = require('fs').promises;
const { readJSON } = require('../services/allCrush');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newArry = await readJSON();
  const deleteId = newArry.filter((crush) => crush.id !== id);
  // newArry[deleteId];
  fs.writeFile('./crush.json', JSON.stringify(deleteId));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
