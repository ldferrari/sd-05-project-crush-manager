const { readJSON, editJSON } = require('../services/allCrush');

module.exports = async (req,res) => {
  const { name, age, date } = req.body;
  const id = parseInt(req.params.id, 10);
  const newArry = await readJSON();
  const findCrush = newArry.find((crush) => crush.id === id);
  const updateCrush = newArry.indexOf(findCrush);
  newArry =[...updateCrush, { id, name, age, date}];
  await editJSON(newArry)
  return res.status(200).json({ id, name, age, date});
};
