const TokenGenerator = require('token-generator');

const emailIsValid = (email) => {
  const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) {
    return { message: 'O campo "email" é obrigatório' };
  }
  if (!regEmail.test(email)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return;
};

const passwordIsValid = (password) => {
  if (!password) {
    return { message: 'O campo "password" é obrigatório' };
  }
  if (!password.length < 6) {
    return { message: 'O "password" ter pelo menos 6 caracteres' };
  }
  return;
};

const setLogin = (req, res) => {
  const { email, password } = req.body;
  const emailWorks = emailIsValid(email);
  const passwordWorks = passwordIsValid(password);
  if (emailWorks.message) {
    return res.status(400).json(emailWorks);
  }
  if (passwordWorks.message) {
    return res.status(400).json(passwordWorks);
  }
  else {
    const token = TokenGenerator.generate();
    return res.status(200).json({ token });
  }
};

module.exports = { setLogin };
