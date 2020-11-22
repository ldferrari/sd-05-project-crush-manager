const express = require('express');

const app = express();

const crypto = require('crypto');

const {
  loginCheck,
  tokenCheck,
  nameCheck,
  ageCheck,
  dateCheck,
} = require('./middleware');

const {
  readCrush, createCrush,
} = require('./utils');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', loginCheck, (_req, res) => {
  const token = generateToken();
  return res.status(200).send({ token });
});

app.post('/crush', tokenCheck, nameCheck, ageCheck, dateCheck, async (req, res) => {
  const allCrushes = await readCrush(__dirname, 'crush.json');
  const newCrush = req.body;
  newCrush.id = allCrushes.length + 1;
  allCrushes.push(newCrush);

  await createCrush(__dirname, 'crush.json', allCrushes);

  return res.status(201).json(newCrush);
});

app.get('/crush', tokenCheck, async (_req, res) => {
  const allCrushes = await readCrush(__dirname, 'crush.json');
  return res.status(200).json(allCrushes);
});

app.listen(3000, () => console.log('Conectamos clã!'));
