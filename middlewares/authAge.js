module.exports = (req, res, next) => {
  if (!req.body.age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (req.body.age < 18) {
    res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }

  next();
};
