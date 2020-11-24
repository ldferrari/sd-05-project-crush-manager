const express = require('express');

const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const generateToken = require('./services/generate-token');
const writeFile = require('./services/writeFile');
const readFile = require('./services/readFile');

const crushList = './crush.json';

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.authLogin, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

app.post('/crush', middlewares.authToken, middlewares.authName, middlewares.authAge, middlewares.authDate, rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const crushFile = JSON.parse(await readFile(crushList));
  const newCrush = {
    id: crushFile.length + 1,
    name,
    age,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };
  crushFile.push(newCrush);
  writeFile(crushList, crushFile);
  res.status(201).json(newCrush);
}));

app.get('/crush', middlewares.authToken, rescue(async (_req, res) => {
  const crushFile = JSON.parse(await readFile(crushList));
  if (crushFile.length === 0) {
    res.status(200).json([]);
  }
  res.status(200).json(crushFile);
}));

app.get('/crush/:id', middlewares.authToken, rescue(async (req, res) => {
  const crushFile = JSON.parse(await readFile(crushList));
  const crushFind = crushFile.find((crush) => parseInt(req.params.id, 10) === crush.id);
  if (crushFind) {
    res.status(200).json(crushFind);
  }
  res.status(404).json({ message: 'Crush não encontrado' });
}));

app.put('/crush/:id', middlewares.authToken, middlewares.authName, middlewares.authAge, middlewares.authDate, rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const crushFile = JSON.parse(await readFile(crushList));
  const crushFilter = crushFile.filter((crush) => parseInt(req.params.id, 10) !== crush.id);
  const updatedCrush = {
    id: parseInt(req.params.id, 10),
    name,
    age,
    date,
  };
  crushFilter.push(updatedCrush);
  writeFile(crushList, crushFilter);
  res.status(200).json(updatedCrush);
}));

app.delete('/crush/:id', middlewares.authToken, rescue(async (req, res) => {
  const crushFile = JSON.parse(await readFile(crushList));
  const crushNew = crushFile.filter((crush) => parseInt(req.params.id, 10) !== crush.id);
  writeFile(crushList, crushNew);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
}));

const PORT = 3000;

app.listen(3000, () => console.log(`Ouvindo a porta ${PORT}`));
