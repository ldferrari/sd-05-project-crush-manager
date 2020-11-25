// Verificação do token: se existe e pela quantidade de caracteres
module.exports = (req, res, next) => {
  const getToken = req.headers.authorization;
  if (!getToken) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (getToken.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};
