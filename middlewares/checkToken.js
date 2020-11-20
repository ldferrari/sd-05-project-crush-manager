module.exports = (req, res, _next) => {
  // const checkTok = res.getHeaders().Authorization;
  const erroTok = req.headers.authorization;
  if (!erroTok) {
    return res.status(401).send({
      message: 'Token não encontrado',
    });
  }
  if (erroTok.length < 16) {
    return res.status(401).send({
      message: 'Token inválido',
    });
  }
  _next();
};
