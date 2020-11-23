const { readCrushFile } = require('../utils');

module.exports = async (_req, res) => {
  const allCrushes = JSON.parse(await readCrushFile('./crush.json'));
  return res.status(200).json(allCrushes);
};
