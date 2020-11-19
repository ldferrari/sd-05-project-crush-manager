const { authorization } = require('./authorization');

const emailRegex = /[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
const passwordRegex = /^(\d|\w){6,}$/;
const nameRegex = /[a-z]{3,}/i;
const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
function emailValidator(req, res, next) {
  switch (true) {
    case !req.body.email:
      return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    case !emailRegex.test(req.body.email):
      return res.status(400).send({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    case !req.body.password:
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

function createCrushValidator(req, res, next) {
  switch (true) {
    case !req.body.name:
      return res.status(400).send({ message: 'O campo "name" é obrigatório' });
    case !nameRegex.test(req.body.name):
      return res.status(400).send({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    case !req.body.age:
      return res
        .status(400)
        .send({ message: 'O campo "age" é obrigatório' });
    case req.body.age < 18:
      return res
        .status(400)
        .send({ message: 'O crush deve ser maior de idade' });
    case !req.body.date.datedAt || !req.body.date.rate:
      return res
        .status(400)
        .send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    case !dateRegex.test(req.body.date.datedAt):
      return res
        .status(400)
        .send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    case req.body.date.rate < 1 || req.body.date.rate > 5:
      return res
        .status(400)
        .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    default:
      next();
  }
}

// alteração muito grande

module.exports = {
  emailValidator,
  createCrushValidator,
  authorization,
};
