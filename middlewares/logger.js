const { validateEmail, validatePassword } = require('../services/validateLogin');
const createToken = require('../services/createToken');

module.exports = (req, res) => {
  const { email, password } = req.body;
  const pw = password.toString();
  // console.log(validateEmail(email));
  // console.log(validatePassword(pw));
  // ifs email
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  // ifs password
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  // token
  res.status(200).json(createToken());
};
