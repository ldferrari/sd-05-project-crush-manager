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

  fs.writeFile('./crush.json', JSON.stringify([...oldCrushList, { id, name, age, date }]), (err) => { throw err; });

  res.status(201).json({ id, name, age, date });
});

app.get('/crush', middlewares.auth, async (_req, res, _next) => {
  const crushList = await helpers.readFileCrush();
  res.status(200).json(crushList);
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
