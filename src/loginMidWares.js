const express = require('express');

const app = express();
const joi = require('joi');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const validateLoginMidware = async (req, res, next) => {
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

  const { email, password } = req.body;
  const emValidate = vEmail.validate({ email });
  const passValidate = vPassword.validate({ password });

  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }

  if (emValidate.error) {
    res
      .status(400)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (passValidate.error) {
    res
      .status(400)
      .send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { validateLoginMidware };
