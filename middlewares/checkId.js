const helpers = require('../helpers');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const crushList = await helpers.readFileCrush();
  const isValid = crushList.some((crush) => crush.id === parseInt(id, 10));
  if (!isValid) return res.status(404).json({ message: 'Crush não encontrado' });
  return next();
};
