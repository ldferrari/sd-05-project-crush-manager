module.exports = (req, res, next) => {
  if (req.body.age === undefined) {
    return res.status(400).send({
      message: 'O campo "age" é obrigatório',
    });
  }
  const { age } = req.body;
  if (age < 18) {
    return res.status(400).send({
      message: 'O crush deve ser maior de idade',
    });
  }
  return next();
};
