const { readCrushFile } = require('../utils');

module.exports = async (_req, res) => {
  const allCrushes = JSON.parse(await readCrushFile('./crush.json'));
  return allCrushes ? res.status(200).json(allCrushes) : res.status(200).json([]);
};
