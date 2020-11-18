const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const { genToken, validateLogin, validateCrush } = require('./middlewares');
const { readCrushs, writeCrushs } = require('./crush/index');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.post('/crush', validateCrush, rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const crushs = await readCrushs();
  const id = parseInt(crushs.length, 10) + 1;
  crushs.push({ name, age, id, date });
  const newCrushs = await writeCrushs(crushs);
  const createdCrush = newCrushs[crushs.length - 1];
  res.status(201).json(createdCrush);
}));

app.post('/login', validateLogin, rescue(async (_, res) => {
  const token = genToken();
  return res.status(200).json(token);
}));

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_, res) => { res.send(); });
