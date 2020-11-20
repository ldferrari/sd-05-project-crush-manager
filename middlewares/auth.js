module.exports = (req, res, next) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!req.body.email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!req.body.email.match(regex)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!req.body.password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (req.body.password.toString().length < 6) {
    res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  next();
};
