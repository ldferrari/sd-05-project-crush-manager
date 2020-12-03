module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  return authorization.length >= 16 ? next() : res.status(401).json({ message: 'Token inválido' });
};
