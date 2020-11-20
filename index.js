const express = require('express');
const {
  loginChecker,
  nameChecker,
  dateChecker,
  ageChecker,
  tokenChecker,
  idChecker,
} = require('./middleware');
const { newToken, read, addNewCrush } = require('./utils');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginChecker, (req, res) => {
  const token = newToken();
  return res.status(200).send(token);
});

app.get('/crush/search', tokenChecker, async (req, res) => {
  const searchTerm = req.query.q;
  const crushs = JSON.parse(await read('./crush.json'));
  if (!searchTerm || searchTerm === '') {
    return res.status(200).json(crushs);
  }
  const foundCrushs = crushs.filter((crush) => crush.name.includes(searchTerm));

  return res.status(200).json(foundCrushs);
});

app.post('/crush', tokenChecker, nameChecker, ageChecker, dateChecker, async (req, res) => {
  const crushs = JSON.parse(await read('./crush.json'));
  const newCrush = req.body;
  newCrush.id = crushs.length + 1;
  crushs.push(newCrush);

  await addNewCrush('./crush.json', crushs);

  return res.status(201).json(newCrush);
});

app.get('/crush', tokenChecker, async (req, res) => {
  const crushList = JSON.parse(await read('./crush.json'));
  return res.status(200).json(crushList);
});

app.get('/crush/:id', tokenChecker, idChecker, async (req, res) => {
  const crushs = JSON.parse(await read('./crush.json'));
  const id = parseInt(req.params.id, 10);
  const crushFound = crushs.find((crush) => crush.id === id);
  return res.status(200).json(crushFound);
});

app.put(
  '/crush/:id',
  tokenChecker,
  nameChecker,
  dateChecker,
  ageChecker,
  idChecker,
  async (req, res) => {
    const { name, age, date } = req.body;
    const crushs = JSON.parse(await read('./crush.json'));
    const id = parseInt(req.params.id, 10);
    const crushId = crushs.findIndex((crush) => crush.id === id);
    crushs[crushId] = { name, age, date, id };

    await addNewCrush('./crush.json', crushs);

    return res.status(200).json(crushs[crushId]);
  },
);

app.delete('/crush/:id', tokenChecker, async (req, res) => {
  const crushs = JSON.parse(await read('./crush.json'));
  const id = parseInt(req.params.id, 10);
  const newCrushList = crushs.filter((crush) => crush.id !== id);

  await addNewCrush('./crush.json', newCrushList);

  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.listen(3000, () => console.log('Servidor operando'));
