const express = require('express'); // importando o express (npm i express | para instalar)

const app = express(); // criando uma instancia do express (criando o servidor)

const bodyParse = require('body-parser'); // transforma a requisição em JSON

const fs = require('fs').promises;

app.use(bodyParse.json());
const crypto = require('crypto');

// não remova esse endpoint, e para o avaliador funcionar
// para criação de rota é necessário 2 coisas: método HTTP e endpoint
app.get('/', (_request, response) => {
  // método HTTP: get + endpoint: '/' = rota
  response.send('Hello no VSCODE');
});
// ------------------------------------

const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({
      message: `O campo "email" é obrigatório${''}`,
    });
  }

  const regexEmail = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{3})*$/
  );

  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: `O "email" deve ter o formato "email@email.com"${''}`,
    });
  }

  if (password === undefined) {
    return res.status(400).json({
      message: `O campo "password" é obrigatório${''}`,
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: `A "senha" deve ter pelo menos 6 caracteres${''}`,
    });
  }

  next();
};

app.post('/login', loginMiddleware, (req, res) => {
  console.log('Ja estou aqui');
  const token = crypto.randomBytes(8).toString('hex'); // 1 byte = 0000 0101
  res.status(200).json({ token });
});

const authTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (token.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};

app.get('/crush', authTokenMiddleware, async (req, res) => {
  const readCrush = await fs.readFile('./crush.json', 'utf-8');
  const arrayCrush = await JSON.parse(readCrush);
  res.status(200).json(arrayCrush);
});

const addCrushMiddleware = (req, res, next) => {
  const { name, age, date } = req.body;
  if (name === undefined || name === '') {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  } else if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  if (age === undefined) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  } else if (age < 18) {
    return res.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }

  if (date === undefined || date.datedAt === undefined || date.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  const regexDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

  if (!regexDate.test(date.datedAt)) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  if (date.rate < 1 || date.rate > 5 || !Number.isInteger(date.rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

app.post('/crush', addCrushMiddleware, authTokenMiddleware, async (req, res) => {
  const readCrush = await fs.readFile('./crush.json', 'utf-8');
  const arrayCrush = await JSON.parse(readCrush);
  const { name, age, date } = req.body;
  const id = arrayCrush.length + 1;
  arrayCrush.push({id, name, age, date})
  console.log(arrayCrush)
  const addCrush = await fs.writeFile('./crush.json', JSON)
  res.status(201).json('OK');
});

// app.use() -> faz com que a função funcione para toda aplicação

// conectando com o servidor
app.listen(3000, () => console.log('Cochilando na porta 3000!!'));
// npm run start: aciona o nodemon que inicia meu servidor
