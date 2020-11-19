const express = require('express');

const app = express();
const crypto = require('crypto');
const joi = require('joi');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const vEmail = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});

const vPassword = joi.object({
  password: joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/),
});

// o regex acima valida email com dommínios ".com" e ".net" alem de validar também
// senhas de 6 a 30 caracteres, podendo conter letras maiusculas, minusculas e números
// fonte : https://www.luiztools.com.br/post/tutorial-de-validacao-de-input-de-dados-em-node-js/

app.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } else if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } else {
    next();
  }
});

app.post('/login', (req, res, next) => {
  const { email } = req.body;
  const emValidate = vEmail.validate({ email });
  if (!emValidate.error) {
    next();
  } else {
    res
      .status(400)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
});

app.post('/login', (req, res, next) => {
  const { password } = req.body;
  const passValidate = vPassword.validate({ password });
  if (!passValidate.error) {
    next();
  } else {
    res
      .status(400)
      .send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
});

app.post('/login', (_req, res, next) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.send({ token });
  next();
});

app.listen(3000, () => {
  console.log('on na porta 3000');
});
