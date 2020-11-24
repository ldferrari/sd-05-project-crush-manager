module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  } else if (authorization.length === 16) {
    next();
  } else {
    res.status(401).json({ message: 'Token inválido' });
  }
};
