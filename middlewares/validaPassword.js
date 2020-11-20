module.exports = (req, res, next) => {
  // console.log(req.body.password);
  if (req.body.password === undefined) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (req.body.password.toString().length > 5) {
    return next();
  }
  res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
};
