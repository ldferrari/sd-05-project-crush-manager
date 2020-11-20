const express = require('express');

const bodyParser = require('body-parser');

const randomToken = require('random-token');

const app = express();

/* REQUISITO 1 - Crie o endpoint POST /login
- O endpoint deve ser capaz de retornar um token aleatório de 16 caracteres
que deverá ser utilizado nas demais requisições.
- O corpo da requisição deverá ter o seguinte formato:
{ "email": "email@email.com", "password": 123456 }
- 4 possibilidades de erro (status 400): e-mail nulo, e-mail inválido,
senha vazia, senha inválida;
*/

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const token = randomToken(16);
  /* pacote utilizado para criar o token: https://www.npmjs.com/package/random-token */

  const validateEmail = (userEmail) => {
    const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return regex.test(String(userEmail).toLowerCase());
  };

  /* fonte do regex: grepper e https://regular-expressions.info/ */

  const validatePassword = (userPassword) => {
    if (userPassword.length >= 6) {
      return true;
    }
    return false;
  };

  if (!email) {
    return res
      .status(400)
      .json({ message: 'O campo "email" é obrigatório' });
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

  res.status(200).json(token);
});

/* ouvindo na porta 3000 */
app.listen(3000, () => console.log('A mãe tá on na porta 3000!'));

/* Ou podemos encadear as requisições para evitar repetir o caminho
app
.route('/')
.get(function (req, res) {
  res.send('hello world get');
})
.post(function (req, res) {
  res.send('hello world post');
});
*/

// não remova esse endpoint, eh para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
