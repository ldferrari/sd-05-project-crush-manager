module.exports = (req, _res, next) => {
  const { email, password } = req.body;
  if (email === undefined || email.length === 0) {
    return next({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.match(/\S+@\S+\.\S+/)) {
    return next({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === undefined || password.length === 0) {
    return next({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return next({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  next();
};
