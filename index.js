const express = require('express');
const crypto = require('crypto');
const bodyparse = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyparse.json());
const PORT = 3000;

app.post('/login', middlewares.login, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({
    token,
  });
});

const nameVal = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};
const ageVal = (req, res, next) => {
  const { age } = req.body;

  if (age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  console.log(typeof age, age);
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

const tokenVal = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined || authorization === null) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 /* | | typeof authorization !== 'string' */) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const dateVal = (req, res, next) => {
  const { date } = req.body;
  console.log(date);
  const regexDate = new RegExp(/([0][1-9]|[1-2][0-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/(\d\d\d\d)/);

  if (date === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date.datedAt === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date.rate === undefined && date.rate !== 0) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  const { datedAt, rate } = date;
  if (!regexDate.test(datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

app.post('/crush', tokenVal, nameVal, ageVal, dateVal, async (req, res, _next) => res.status(999));

app.listen(PORT, () => console.log(`Looking at port ${PORT}`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
