module.exports = (req, res, next) => {
  if (req.body.name) {
    if (req.body.name.length >= 3) {
      next();
    } else {
      res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  } else {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
};
