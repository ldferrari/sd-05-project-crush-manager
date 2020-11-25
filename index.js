const express = require('express');
const fs = require('fs').promises;

const bodyParser = require('body-parser');

const crypto = require('crypto');
const loginMid = require('./src/loginMidWares.js');
const createCrush = require('./src/createCrush');
const crushId = require('./src/crushByIdMid');
const dc = require('./src/deleteCrushMid');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// desafio 1

app.post('/login', loginMid.validateLoginMidware, async (_req, res, _) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.send({ token });
});

// desafio 2

app.post('/crush', createCrush.createCrush, async (req, res, _) => {
  const { body } = req;
  const list = await fs.readFile('./crush.json', 'utf8');
  const newList = await JSON.parse(list);
  body.id = newList.length + 1;
  newList.push(body);
  fs.writeFile('./crush.json', newList, 'utf8');
  res.status(201).send(req.body);
});

// desafio 3
app.get('/crush', async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    res.status(401).send({ message: 'Token não encontrado' });
  } else if (authorization.length !== 16 || authorization === '') {
    res.status(401).send({ message: 'Token inválido' });
  } else {
    next();
  }
});

app.get('/crush', async (_req, res, _next) => {
  const crushs = await fs.readFile('./crush.json', 'utf8');
  if (crushs === '') {
    res.status(200).send([]);
  } else {
    res.status(200).json(JSON.parse(crushs));
  }
});

app.listen(3000, () => {
  console.log('on');
});

// desafio 4
app.get('/crush/:id', crushId.byId, async (req, res, _) => {
  const { id } = req.params;
  const crushs = await fs.readFile('./crush.json', 'utf8');
  const list = JSON.parse(crushs);
  res.status(200).json(list[id - 1]);
});

// desafio 5
app.put('/crush/:id', createCrush.createCrush, async (req, res, _next) => {
  const { name, age, date: { datedAt, rate } } = req.body;
  const id = parseInt(req.params.id, 10);
  // radix parameter: base da string, 10 indica sistema númerico decimal.
  // fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  const list = await fs.readFile('./crush.json', 'utf8');
  const crushs = JSON.parse(list);
  const i = id - 1;
  crushs[i] = { name, age, date: { datedAt, rate }, id };
  const newCrush = JSON.stringify(crushs);
  fs.writeFile('./crush.json', newCrush);
  res.status(200).json(crushs[i]);
});

// desafio 6
app.delete('/crush/:id', dc.deleteCrush, async (req, res, _next) => {
  const { id } = req.params;
  const i = id - 1;
  const list = await fs.readFile('./crush.json', 'utf8');
  const crush = JSON.parse(list);
  crush.splice(i, 1);
  const newList = JSON.stringify(crush);
  fs.writeFile('./crush.json', newList, 'utf8');
  res.status(200).send({ message: 'Crush deletado com sucesso' });
});
