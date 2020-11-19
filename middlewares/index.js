const emailRegex = /[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
const passwordRegex = /^(\d|\w){6,}$/;
function emailValidator(req, res, next) {
  switch (true) {
    case !req.body.email:
      return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    case !emailRegex.test(req.body.email):
      return res.status(400).send({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    case req.body.password === undefined:
      return res
        .status(400)
        .send({ message: 'O campo "password" é obrigatório' });
    case !passwordRegex.test(req.body.password):
      return res
        .status(400)
        .send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    default:
      next();
  }
}

// alteração muito grande

module.exports = {
  emailValidator,
};
