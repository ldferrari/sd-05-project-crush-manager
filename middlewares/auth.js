/* Verifica se a requisição possui o token de autenticação nos headers. */

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  return next();
};
