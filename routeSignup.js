const express = require('express');

const crypto = require('crypto');

const router = express.Router();

const validateEmail = (email) => {
  const regexEmail = /\S+@\S+\.\S+/;
  return regexEmail.test(String(email).toLowerCase());
};

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

router.post('/', (req, res) => {
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
