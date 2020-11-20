module.exports = (req, res, next) => {
  if (req.body.name === undefined) {
    return res.status(400).send({
      message: 'O campo "name" é obrigatório',
    });
  }
  const { name } = req.body;
  if (name.length < 3) {
    return res.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  return next();
};
