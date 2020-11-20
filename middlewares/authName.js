module.exports = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (req.body.name.toString().length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};
