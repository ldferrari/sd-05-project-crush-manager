const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const { genToken, validateLogin, validateCrush, validateToken } = require('./middlewares');
const readCrushs = require('./utils/fs/readFile');
const crushs = require('./crush.json');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.post('/crush', validateToken, validateCrush, rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const id = crushs.length + 1;
  res.status(201).json({ name, age, id, date });
}));

app.get('/crush/:id', validateToken, rescue(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushList = await readCrushs();
  const crush = crushList.find((c) => c.id === id);

  if (!crush) return res.status(404).json({ message: 'Crush não encontrado' });

  return res.status(200).json(crush);
}));

app.get('/crush', validateToken, rescue(async (_, res) => {
  const crushList = await readCrushs();
  res.status(200).json(crushList);
}));

app.post('/login', validateLogin, rescue(async (_, res) => {
  const token = genToken();
  return res.status(200).json(token);
}));

app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_, res) => { res.send(); });
