const { readJSON } = require('../services/allCrush');

module.exports = async (req, res) => {
  const newArry = await readJSON();
  const { q } = req.query;
  const filterTerm = newArry.filter((crush) => crush.name.includes(q));
  if (q === true) {
    return res.status(200).json(filterTerm);
  }
  return res.status(200).json(newArry);
};
