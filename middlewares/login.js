const randtoken = require('rand-token');

const token = randtoken.generate(16);
const checkEmail = (mail) => mail.match(/\S+@\S+\.\S+/);

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  if (password.length >= 6 && checkEmail(email)) {
    return res.status(200).json({ token });
  }
  next();
};
