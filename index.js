const express = require('express');
const fs = require('fs').promises;

const bodyParser = require('body-parser');

const crypto = require('crypto');
const loginMid = require('./src/loginMidWares.js');
const createCrush = require('./src/createCrush');
const crushId = require('./src/crushByIdMid');
const lv = require('./src/loginValidation');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', loginMid.validateLoginMidware, async (_req, res, _) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.send({ token });
});

app.post('/crush', lv.authValidation, createCrush.createCrush, async (req, res, _) => {
  const { body } = req;
  const list = await fs.readFile('./crush.json', 'utf8');
  const newList = JSON.parse(list);
  body.id = newList.length + 1;
  newList.push(body);
  fs.writeFile('./crush.json', newList, 'utf8');
  res.status(201).send(req.body);
});

app.get('/crush', lv.authValidation, async (_req, res, _) => {
  const crushs = await fs.readFile('./crush.json', 'utf8');
  if (crushs === '') {
    res.status(200).send([]);
  } else {
    res.status(200).json(JSON.parse(crushs));
  }
});

app.get('/crush/:id', lv.authValidation, crushId.byId, async (req, res, _) => {
  const { id } = req.params;
  const crushs = await fs.readFile('./crush.json', 'utf8');
  const list = JSON.parse(crushs);
  res.status(200).json(list[id - 1]);
});

app.put('/crush/:id', lv.authValidation, createCrush.createCrush, async (req, res, _) => {
  try {
    const {
      name,
      age,
      date: { datedAt, rate },
    } = req.body;
    const id = parseInt(req.params.id, 10);
    const list = await fs.readFile('./crush.json', 'utf8');
    const crushs = JSON.parse(list);
    const i = id - 1;
    crushs[i] = { name, age, date: { datedAt, rate }, id };
    const newCrush = JSON.stringify(crushs);
    fs.writeFile('./crush.json', newCrush);
    res.status(200).json(crushs[i]);
  } catch (er) {
    console.log(er);
  }
});

app.delete('/crush/:id', lv.authValidation, async (req, res, _next) => {
  const { id } = req.params;
  const i = id - 1;
  const list = await fs.readFile('./crush.json', 'utf8');
  const crush = JSON.parse(list);
  crush.splice(i, 1);
  const newList = JSON.stringify(crush);
  fs.writeFile('./crush.json', newList, 'utf8');
  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.listen(3000, () => {
  console.log('on');
});
