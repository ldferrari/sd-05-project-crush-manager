const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const crypto = require('crypto');
const middlewares = require('./middlewares');
const helpers = require('./helpers');

const app = express();
const PORT = 3000;
const token = crypto.randomBytes(8).toString('hex');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.logger, (_req, res, _next) => {
  res.status(200).json({ token });
});

app.post('/crush', middlewares.auth, middlewares.dataFormat, async (req, res, _next) => {
  const { name, age, date } = req.body;
  const oldCrushList = await helpers.readFileCrush();
  const id = oldCrushList.length + 1;

  fs.writeFile('./crush.json', JSON.stringify([...oldCrushList, { name, age, id, date }]), (err) => { throw err; });

  res.status(201).json({ id, name, age, date });
});

app.get('/crush', middlewares.auth, async (_req, res, _next) => {
  const crushList = await helpers.readFileCrush();
  res.status(200).json(crushList);
});

app.get('/crush/search', middlewares.auth, async (req, res, _next) => {
  const searchedString = req.query.q;
  const crushList = await helpers.readFileCrush();
  const foundCrush = crushList.filter((crush) => crush.name.includes(searchedString));
  res.status(200).json(foundCrush);
});

app.get('/crush/:id', middlewares.auth, middlewares.checkId, async (req, res, _next) => {
  const crushList = await helpers.readFileCrush();
  const filteredCrush = crushList.find((crush) => crush.id === parseInt(req.params.id, 10));
  res.status(200).json(filteredCrush);
});

app.put('/crush/:id', middlewares.auth, middlewares.checkId, middlewares.dataFormat, async (req, res, _next) => {
  const crushList = await helpers.readFileCrush();
  const id = parseInt(req.params.id, 10);
  const { name, age, date } = req.body;
  const filteredCrush = crushList.findIndex((crush) => crush.id === id);
  crushList[filteredCrush] = { name, age, id, date };
  await fs.writeFile('./crush.json', JSON.stringify([crushList]), (err) => { throw err; });
  res.status(200).json(crushList[filteredCrush]);
});

app.delete('/crush/:id', middlewares.auth, async (req, res, _next) => {
  const crushList = await helpers.readFileCrush();
  const id = parseInt(req.params.id, 10);
  // tive problema pra remover com splice e vi no repo do Felipe essa maneira de remover com filter
  const filteredList = crushList.filter((crush) => crush.id !== id);
  await fs.writeFile('./crush.json', JSON.stringify([filteredList]), (err) => { throw err; });
  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
