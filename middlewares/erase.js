const fs = require('fs').promises;

const { readList } = require('../services');

module.exports = async (req, res) => {
  // const { name, age, date } = req.body;
  const crushList = await readList();
  const id = +req.params.id;
  const newList = crushList.filter((crush) => crush.id !== id);
  fs.writeFile('./crush.json', JSON.stringify(newList));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
