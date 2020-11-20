const regEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
module.exports = (req, res, next) => {
  if (req.body.email === undefined) {
    return res.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (req.body.email.match(regEmail)) {
    return next();
  }

  return res.status(400).send({
    message: 'O "email" deve ter o formato "email@email.com"',
  });
};
