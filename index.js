const crypto = require('crypto');
const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// [HONESTIDADE ACADEMICA] Obtive ajuda no plantao do projeto para sanar
// duvidas em relacao ao uso de bibliotecas e funcoes assincronas
app.post('/login', middlewares.login, rescue(async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
}));

app.get('/crush/:id', middlewares.tokenValidation, middlewares.getCrushById, async (req, res) => {
  const { id: stringID } = req.params;
  const id = parseInt(stringID, 10);

  const readFromFile = await fs.readFile('crush.json');
  const array = JSON.parse(readFromFile);
  const loockupID = array.find((obj) => obj.id === id);
  // console.log(loockupID);
  res.status(200).json(loockupID);
});

app.get('/crush', middlewares.tokenValidation, async (_req, res) => {
  const readFromFile = await fs.readFile('crush.json');
  const array = JSON.parse(readFromFile);
  res.status(200).json(array);
});

app.post('/crush', middlewares.tokenValidation, middlewares.createCrush, rescue(async (req, res) => {
  const readFromFile = await fs.readFile('crush.json');
  const array = JSON.parse(readFromFile);

  const { name, age, date } = req.body;
  const id = array.length + 1;
  const newCrush = { id, name, age, date };

  array.push(newCrush);

  await fs.writeFile('crush.json', JSON.stringify(array));

  return res.status(201).json(newCrush);
}));

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json(err);
  }
  // return res.status(500).json({ status: 500, message: 'erro interno do servidor' });
});

app.listen(3000, () => console.log('ouvindo na porta 3000'));
