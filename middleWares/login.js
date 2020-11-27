const middleWareEmail = (req, res, next) => {
  const { email } = req.body;
  const emailValid = RegExp('^.+@.+.(.{3}|.{2})$');

  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValid.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const middleWarePassword = (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { login: [middleWareEmail, middleWarePassword] };
