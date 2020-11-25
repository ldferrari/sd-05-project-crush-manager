const emailIsValid = (email) => {
  const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) {
    return { message: 'O campo "email" é obrigatório' };
  }
  if (!regEmail.test(email)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return true;
};

const passwordIsValid = (password) => {
  if (!password) {
    return { message: 'O campo "password" é obrigatório' };
  }
  if (password.length < 6) {
    return { message: 'A "senha" deve ter pelo menos 6 caracteres' };
  }
  return true;
};

const dataAuth = (req, res, next) => {
  const { email, password } = req.body;
  const emailWorks = emailIsValid(email);
  const passwordWorks = passwordIsValid(password);
  if (emailWorks.message) {
    return res.status(400).json({ message: emailWorks.message });
  }
  if (passwordWorks.message) {
    return res.status(400).json({ message: passwordWorks });
  }
  return next();
};

module.exports = { dataAuth };