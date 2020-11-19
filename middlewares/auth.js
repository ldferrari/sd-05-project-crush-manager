module.exports = (req, res, next) => {
  const givenToken = req.headers.authorization;
  // code achado por interpretação de "A requisição deve ter o token de autenticação nos headers"
  // & por leitura dos testes do requisito.
  if (givenToken.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!givenToken) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  next();
};
