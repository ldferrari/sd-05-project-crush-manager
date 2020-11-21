const { readList } = require('../services');

module.exports = async (_, res) => {
  const listCrushs = await readList();
  if (!listCrushs) return [];
  return res.status(200).json(listCrushs);
};
