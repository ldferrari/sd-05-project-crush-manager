const { readCrushFile } = require('../services/crudFunctions');

module.exports = async (req, res) => {
  // const search = req.query.search; - tem que ser q dada a url
  // const q = req.query.q; - ESLINT reclamou
  const { q } = req.query;
  console.log(q);
  const crushList = await readCrushFile();
  const searchedList = crushList.filter((crush) => crush.name.includes(q));
  if (searchedList.length === 0) {
    return res.status(404).json({ message: 'nome não encontrado' });
  }
  return res.status(200).json(searchedList);
};
