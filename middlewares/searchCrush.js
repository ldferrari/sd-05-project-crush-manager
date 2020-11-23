const { readCrushFile } = require('../utils');

module.exports = async (req, res) => {
  const { q } = req.query;
  const crushList = JSON.parse(await readCrushFile('./crush.json'));

  if (!q || q === '') {
    return res.status(200).json(crushList);
  }

  const searchResults = crushList.filter((crush) => crush.name.includes(q));

  return res.status(200).json(searchResults);
};
