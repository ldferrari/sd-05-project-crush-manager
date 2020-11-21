const emailValidator = require('../funcoes/emailValidator');

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  const isEmailValid = emailValidator(email);

  if (!isEmailValid) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = validateEmail;
