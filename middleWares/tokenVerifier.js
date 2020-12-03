module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (String(token).length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};
