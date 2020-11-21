const readFile = require('../funcoes/readFile');

const getAllCrushs = async (_req, res) => {
  try {
    const crushs = await readFile();
    res.status(200).json(crushs);
  } catch (err) {
    console.error('This is message of error:', err);
  }
};

module.exports = getAllCrushs;
