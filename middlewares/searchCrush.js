const { readCrush } = require('../utilities/readCrush');

const crushPath = 'crush.json';

module.exports = async (req, res) => {
  const { q } = req.query;

  const data = JSON.parse(await readCrush(crushPath));
  const crushFilteresByName = data.filter((crush) => crush.name.includes(q));

  if (!q || q === '') res.status(200).json(data);
  else if (crushFilteresByName === undefined) res.status(200).json([]);
  else res.status(200).json(crushFilteresByName);
};
