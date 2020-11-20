const validaEmail = require('../services/validaEmail');
const validaPassword = require('../services/validaPassword');
const token = require('../services/genToken');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const passString = password.toString();

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!validaEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (!validaPassword(passString)) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  res.status(200).json(token());

  return next();
};
