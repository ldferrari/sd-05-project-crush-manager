const rescue = require('express-rescue');

const validateLogin = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  if (!email) {
    return res
      .status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regex.test(email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  return next();
});

module.exports = validateLogin;
