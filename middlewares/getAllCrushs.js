module.exports = (req, _res, next) => {
  const token = req.header('authorization');
  if (token === undefined) {
    return next({ message: 'Token não encontrado', status: 401 });
  }
  if (token.length !== 16) {
    return next({ message: 'Token inválido', status: 401 });
  }
  next();
};
