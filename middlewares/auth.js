// autorização se há token
module.exports = (req, res, next) => {
  const autorizacao = req.headers.authorization;

  if (!autorizacao) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (autorizacao.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  return next();
};
