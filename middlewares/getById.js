const { readCrush } = require('../utilities/readCrush');

const crushPath = 'crush.json';

module.exports = async (req, res) => {
  const { id } = req.params;

  const crushFiles = JSON.parse(await readCrush(crushPath));

  const findCrushById = crushFiles.find((crush) => parseInt(id, 10) === crush.id);

  if (!findCrushById) return res.status(404).json({ message: 'Crush não encontrado' });

  return res.status(200).json(findCrushById);
};
