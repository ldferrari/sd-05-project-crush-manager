module.exports = (req, res, next) => {
  if (req.body.password) {
    if (req.body.password.toString().length >= 6) {
      next();
    } else {
      res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    }
  } else {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
};
