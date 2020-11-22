const allCrushes = require('../crush.json');

module.exports = (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  const crush = allCrushes.find((el) => el.id === id);

  if (crush === undefined || !crush) {
    return res.status(404).json({
      message: 'Crush não encontrado',
    });
  }

  return next();
};
