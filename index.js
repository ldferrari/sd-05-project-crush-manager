const express = require('express');

const app = express();
// app.use(express.json()); - melhor pratica de usar bodyParser

// Importações
const bodyParser = require('body-parser');
// const middlewares = require('./middlewares');
const createToken = require('./services/createtoken');
const { validateEmail, validatePassword } = require('./services/validateLogin');

// Port listening
const PORT = 3000;
app.listen(PORT, () => console.log('3000 port OK!'));

// Middlewares e uses diversos
app.use(bodyParser.json());
// app.use(middlewares.namemw);

// ENDPOINTS

// 0 - não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// 1 - Crie o endpoint POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const pw = password.toString();
  console.log(validateEmail(email));
  console.log(validatePassword(pw));
  // ifs email
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  // ifs password
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (!validatePassword(password)) {
    return res.status(400).send({ message: 'O "password" ter pelo menos 6 caracteres' });
  }
  // // ifs res token
  if (email && password) {
    return res.status(200).json(createToken());
  }
});

// Middlewares de erro
// app.use(middlewares.error);
