const { readCrushFile } = require('../utils');

module.exports = async (req, res) => {
  const searchParam = req.query.q;
  const crushList = JSON.parse(await readCrushFile('./crush.json'));
  if (!searchParam || searchParam === '') return res.status(200).json(crushList);
  const searchResults = crushList.filter((crush) => crush.name.includes(searchParam));
  res.status(200).json(searchResults);
};
