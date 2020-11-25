module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const emailValid = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{3})*$/,
  );

  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailValid.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  next();
};
