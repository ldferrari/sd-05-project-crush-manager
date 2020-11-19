module.exports = (req, res, _next) => {
  // const checkTok = res.getHeaders().Authorization;
  const erroTok = req.headers.authorization;
  if (!erroTok) {
    res.status(401).send({
      message: 'Token não encontrado',
    });
  }
  if (erroTok.length < 16) {
    res.status(401).send({
      message: 'Token inválido',
    });
  }
  _next();
};
