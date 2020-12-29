// Criação do /login

// Primeiro passo: chamar o express
const express = require('express');

// Segundo passo: chamar o router serve para construção das rotas
const router = express.Router();

// Importando o crypto para ser usado na função: generateToken
const crypto = require('crypto');

// função padrão para criar o token aleatório de 16 caracteres
function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

// função padrão para validar email
const validateEmail = (email) => {
  const regexEmail = /\S+@\S+\.\S+/;
  return regexEmail.test(String(email).toLowerCase());
};

// criação do post. Validação dos itens
router.post('/', (req, res) => {
  // será usado no index
  if (!req.body.email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!validateEmail(req.body.email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!req.body.password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (req.body.password.toString().length < 6) {
    res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;
