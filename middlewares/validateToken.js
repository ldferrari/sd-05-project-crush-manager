const rescue = require('express-rescue');

const validateToken = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token não encontrado' });
  }

  if (token && token.length < 10) {
    return res
      .status(401)
      .json({ message: 'Token inválido' });
  }

  return next();
});

module.exports = validateToken;
