const read = require('../utils/readCrush');

module.exports = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const crushs = JSON.parse(await read('./crush.json'));
  const exists = crushs.some((user) => user.id === parseInt(id, 10));

  if (!exists) {
    return res.status(404).json({
      message: 'Crush não encontrado',
    });
  }

  return next();
};
