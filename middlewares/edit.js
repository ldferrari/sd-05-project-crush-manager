const fs = require('fs').promises;

const { readList } = require('../services');

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const crushList = await readList();
  const id = +req.params.id;
  const foundCrush = crushList.find((crush) => crush.id === id);
  crushList[crushList.indexOf(foundCrush)] = { id, name, age, date };
  fs.writeFile('./crush.json', JSON.stringify(crushList));
  return res.status(200).json({ id, name, age, date });
};
