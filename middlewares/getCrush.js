const { readCrushFile } = require('../service/readFile');

const getCrush = async (_req, res) => {
  try {
    const crush = await readCrushFile();
    res.status(200).json(crush);
  } catch (err) {
    throw err;
  }
};

module.exports = { getCrush };
