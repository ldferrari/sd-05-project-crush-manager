const express = require('express');

const app = express();
// app.use(express.json()); - melhor pratica de usar bodyParser

// Importações
const bodyParser = require('body-parser');
// const middlewares = require('./middlewares');
const createToken = require('./services/createtoken');
const { validateEmail, validatePassword } = require('./services/validateLogin');

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
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  // ifs password
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  // // ifs res token
  // if (email && password) {
  //   return res.status(200).json(createToken());
  // }
  res.status(200).json(createToken());
});

// 2 - Crie o endpoint POST /crush
app.post('/crush', (req, res) => {
  const { name, age, date } = req.body;
  //ifs do name
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  //ifs do age
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  //ifs do date
  if (date.rate < 1 || date.rate > 5 || !Number.isInteger(date.rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!checkDatedAt(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!date.datedAt || !date.rate) {
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  // token
});

function checkDatedAt(data) {
  const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return re.test(String(data));
}
// pacote moment é outra opçao

// Middlewares de erro
// app.use(middlewares.error);

// Port listening
const PORT = 3000;
app.listen(PORT, () => console.log('3000 port OK!'));
