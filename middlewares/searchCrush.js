const fs = require('fs').promises;

module.exports = async (req, res) => {
  const { q } = req.query;
  const myCrushes = await JSON.parse(fs.readFile('./crush.json', 'utf8'));
  const searchMyCrush = myCrushes.filter((crush) => crush.name.includes(q));

  return (!q || q === '')
    ? res.status(200).json(myCrushes)
    : res.status(200).json(searchMyCrush);
};
