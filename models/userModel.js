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

module.exports = { emailIsValid, passwordIsValid };
