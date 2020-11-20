const readCrushFile = require('../functions/readCrushFile');

module.exports = async (req, res) => {
  const file = await readCrushFile();
  res.status(200).json(file);
};
