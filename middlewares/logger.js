const crypto = require('crypto');

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => password.length > 5;

module.exports = (req, res, _next) => {
  // req.startTime = Date.now();
  // console.log(`[${req.method}] ${req.path}`);
  const { email, password } = req.body;
  //  validação email vazio
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  // verificação email válido
  if (!validateEmail(email, res)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  //  validação senha vazia
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  //  validação quantidade de caracteres senha
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
};
