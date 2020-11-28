/* Realiza as seguintes verificações:
- O endpoint deve ser capaz de retornar um token aleatório de 16 caracteres
que deverá ser utilizado nas demais requisições.
- O corpo da requisição deverá ter o seguinte formato:
{ "email": "email@email.com", "password": 123456 }
- 4 possibilidades de erro (status 400): e-mail nulo, e-mail inválido,
senha vazia, senha inválida;
*/

const crypto = require('crypto');

module.exports = (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js

  const { email, password } = req.body;

  const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  // fonte do regex: grepper e https://regular-expressions.info/

  const validateEmail = (userEmail) =>
    regex.test(String(userEmail).toLowerCase());

  const validatePassword = (userPassword) => {
    if (userPassword.length >= 6) {
      return true;
    }
    return false;
  };

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (!validatePassword(password)) {
    return res
      .status(400)
      .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token });
};
