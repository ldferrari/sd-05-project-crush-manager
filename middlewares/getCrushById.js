const readFile = require('../services/readFile');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const crushId = parseInt(id, 10);
  const myCrushes = JSON.parse(await readFile('./crush.json'));
  const myCrush = myCrushes.some((user) => user.id === parseInt(crushId, 10));

  if (!myCrush) {
    return res.status(404).json({
      message: 'Crush não encontrado',
    });
  }

  return next();
};
