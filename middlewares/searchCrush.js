// Referência:
// https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js

const readFile = require('../funcoes/readFile');

const searchCrush = async (req, res) => {
  const { q: searchTerm } = req.query;
  try {
    const crushs = await readFile();
    const matchedCrushs = crushs.filter((crush) => crush.name.includes(searchTerm));
    res.status(200).json(matchedCrushs || []);
  } catch (err) {
    console.error(err);
  }
};

module.exports = searchCrush;
