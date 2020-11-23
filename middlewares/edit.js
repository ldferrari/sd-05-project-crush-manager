const { readList } = require('../services');

module.exports = async (req, res) => {
  const { name, age, date } = await req.body;
  const crushList = await readList();
  const id = +req.params.id;
  // const deleteCrush = crushList.filter((crush) => crush.id !== id);
  // const newList = [...deleteCrush, { id, name, age, date }];
  const foundCrush = crushList.find((crush) => crush.id === id);
  crushList[crushList.indexOf(foundCrush)] = { id, name, age, date };
  fs.writeFile('./crush.json', JSON.stringify(newList));
  return res.status(200).json(newList);
};
