const rescue = require('express-rescue');

const { readCrushFile } = require('../Services');

module.exports = rescue(async (req, res) => {
  const crushData = await readCrushFile();

  res.status(200).json(crushData);
});
