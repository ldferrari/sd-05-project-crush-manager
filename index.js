const express = require('express');

const app = express();

const crypto = require('crypto');

const {
  loginCheck,
  tokenCheck,
  nameCheck,
  ageCheck,
  dateCheck,
  idCheck,
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

app.get('/crush/search', tokenCheck, async (req, res) => {
  const term = req.query.q;
  const allCrushes = await readCrush(__dirname, 'crush.json');

  if (!term || term === '') {
    return res.status(200).json(allCrushes);
  }

  const searchResult = allCrushes.filter((crush) => crush.name.includes(term));

  return res.status(200).json(searchResult);
});

app.get('/crush/:id', tokenCheck, idCheck, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const allCrushes = await readCrush(__dirname, 'crush.json');

  const crush = allCrushes.find((el) => el.id === id);
  return res.status(200).json(crush);
});

app.put('/crush/:id', tokenCheck, nameCheck, ageCheck, dateCheck, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, age, date: { datedAt, rate } } = req.body;
  const allCrushes = await readCrush(__dirname, 'crush.json');

  const crushId = allCrushes.findIndex((el) => el.id === id);
  allCrushes[crushId] = { name, age, date: { datedAt, rate }, id };

  await createCrush(__dirname, 'crush.json', allCrushes);

  return res.status(200).json(allCrushes[crushId]);
});

app.delete('/crush/:id', tokenCheck, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const allCrushes = await readCrush(__dirname, 'crush.json');

  allCrushes.filter((crush) => crush.id !== id);
  await createCrush(__dirname, 'crush.json', allCrushes);

  return res.status(200).json({
    message: 'Crush deletado com sucesso',
  });
});

app.listen(3000, () => console.log('Conectamos clã!'));
