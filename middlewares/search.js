const { readList } = require('../services');

module.exports = async (req, res) => {
  const crushList = await readList();
  const id = Number(req.params.id);
  const crushFound = crushList.find((crush) => crush.id === id);
  if (crushFound) return res.status(200).json(crushFound);
  return res.status(404).json({
    message: 'Crush não encontrado',
  });
};
