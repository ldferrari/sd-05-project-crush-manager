const express = require('express');

const router = express.Router();
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function validateEmail(email) {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  return regexEmail.test(String(email).toLowerCase());
}

router.post('/', async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: `O campo \'email\' é obrigatório` });
  }
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ message: `O \'email\' deve ter o formato \'email@email.com\'` });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: `O campo \'password\' é obrigatório` });
  }
  if (req.body.password.length < 6) {
    return res.status(400).json({ message: `A \'senha\' deve ter pelo menos 6 caracteres` });
  }

  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;
