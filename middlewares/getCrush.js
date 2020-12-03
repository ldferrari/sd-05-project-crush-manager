const { readCrush } = require('../utilities/readCrush');

const crushPath = 'crush.json';

module.exports = async (_req, res) => {
  const data = JSON.parse(await readCrush(crushPath));
  if (data.length === 0) return res.status(200).json([]);
  return res.status(200).json(data);
};
