module.exports = (req, res, next) => {
  const regexEmail = /\S+@\S+\.\S+/;

  const validateMail = (mail) => regexEmail.test(String(mail).toLowerCase());

  const { email, password } = req.body;

  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!validateMail(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }

  return next();
};
