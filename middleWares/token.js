const middleWareToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  if (token === undefined || token === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = middleWareToken;
