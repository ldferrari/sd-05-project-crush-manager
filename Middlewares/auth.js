module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (req.headers.authorization.length < 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};
