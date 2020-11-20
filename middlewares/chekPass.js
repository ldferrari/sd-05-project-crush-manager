module.exports = (req, res, next) => {
  if (req.body.password === undefined) {
    return res.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (req.body.password.length > 5) {
    return next();
  }
  return res.status(400).send({
    message: 'A "senha" deve ter pelo menos 6 caracteres',
  });
};
