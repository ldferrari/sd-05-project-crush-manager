module.exports = (req, res, next) => {
  const missToken = req.headers.authorization;

  if (!missToken) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (missToken.length < 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};
