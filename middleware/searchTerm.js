const readCrushFile = require('../functions/readCrushFile');

module.exports = async (req, res) => {
  const { q } = req.query;
  const file = await readCrushFile();
  if (!q) {
    return res.status(200).json(file);
  }
  return res.status(200).json(file.filter(({ name }) => name.includes(q)));
};
