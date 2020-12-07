const express = require('express');
const randomTokenGenerator = require('rand-token');

const isEmail = require('../utils/email');

const authenticationRouter = express.Router();

authenticationRouter.post('/', (request, response) => {
  const { email, password } = request.body;

  if (!email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isEmail(email)) return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  const token = randomTokenGenerator.generate(16);

  return response.status(200).json({ token });
});

module.exports = authenticationRouter;
