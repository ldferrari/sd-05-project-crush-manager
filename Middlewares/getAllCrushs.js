const { readCrushFile } = require('../Services');

module.exports = async (req, res) => {
  const crushData = await readCrushFile();

  res.status(200).json(crushData);
};
