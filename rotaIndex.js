const express = require('express');

const router = express.Router();
const crypto = require('crypto'); // gera token

// live com Hugão (meu ídolo)
// devem permanecer na raiz

function geraToken() {
  return crypto.randomBytes(2).toString('hex');
}

const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

function emailValidado(email) {
  return regexEmail.test(String(email).toLowerCase());
}
// retorna booleano

const validaData = (body) => body.email && body.password;
// confirma email e senha

router.post('/', async (req, res) => {
  if (!validaData(req.body)) {
    return res.status(400).json({ message: 'missing data' });
  }
  const token = geraToken();
  // une rota raiz com rota /login
  const { email, password } = req.params;
  if (email === null || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!emailValidado(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!password === null || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token });
});

module.exports = router;
