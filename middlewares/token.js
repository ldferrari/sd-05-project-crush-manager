module.exports = (req, res, _next) => {
  const missToken = req.headers.authorization;
  if (!missToken) {
    res.status(401).send({
      message: 'Token não encontrado',
    });
  }
  if (missToken.length < 16) {
    res.status(401).send({
      message: 'Token inválido',
    });
  }
  _next();
};
