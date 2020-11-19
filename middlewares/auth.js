const validateEmail = (email, res) => {
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return true;
};

const validatePassword = (password, res) => {
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  return true;
};

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  validateEmail(email, res);
  validatePassword(password, res);
  return next();
};
