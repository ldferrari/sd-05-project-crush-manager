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
    return res.status(400).json(emailWorks);
  }
  if (passwordWorks.message) {
    return res.status(400).json(passwordWorks);
  }
  return next();
};

// const tokenIsValid = (token) => {

// }

// const tokenValidation = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     return res.status(401).json({message: 'Token não encontrado' });
//   }
//   if (authorization.length !== 16) {
//     return res.status(401).json({ message: 'Token inválido'});
//   }
// }

// module.exports = { dataAuth, tokenValidation };
