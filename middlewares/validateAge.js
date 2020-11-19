module.exports = (req, res, next) => {
  if (req.body.age) {
    if (req.body.age >= 18) {
      next();
    } else {
      res.status(400).json({ message: 'O crush deve ser maior de idade' });
    }
  } else {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
};
