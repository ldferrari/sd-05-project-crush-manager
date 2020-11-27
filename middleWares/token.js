const middleWareToken = (req, res, next) => {
  const { token } = req.headers;

  if (token === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (token == {}) {
    return res.status(200).json([]);
  }
  next();
};

module.exports = { token: middleWareToken };
