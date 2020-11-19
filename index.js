const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const generateToken = require('./services/generate-token');
const readFile = require('./services/readFile');
const writeFile = require('./services/writeFile');

const app = express();
const PORT = 3000;
const crushFilePath = './crush.json';

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.validateEmail, middlewares.validatePassword, (req, res) => {
  res.status(200).json({ token: generateToken() });
});

app.post('/crush', middlewares.auth, middlewares.validateName, middlewares.validateAge, middlewares.validateDate, rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const crushFile = JSON.parse(await readFile(crushFilePath));
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
  writeFile(crushFilePath, crushFile);
  res.status(201).json(newCrush);
}));

app.get('/crush/search', middlewares.auth, rescue(async (req, res) => {
  const { q } = req.query;
  const crushFile = JSON.parse(await readFile(crushFilePath));
  const crushByName = crushFile.filter((crush) => crush.name.includes(q));
  if (!q || q === '') {
    res.status(200).json(crushFile);
  } else if (crushByName === undefined) {
    res.status(200).json([]);
  } else {
    res.status(200).json(crushByName);
  }
}));

app.get('/crush', middlewares.auth, rescue(async (req, res) => {
  const crushFile = JSON.parse(await readFile(crushFilePath));
  if (crushFile.length > 0) {
    res.status(200).json(crushFile);
  } else {
    res.status(200).json([]);
  }
}));

app.put('/crush/:id', middlewares.auth, middlewares.validateDate, middlewares.validateName, middlewares.validateAge, rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  const crushFile = JSON.parse(await readFile(crushFilePath));
  const newCrush = {
    id: parseInt(id, 10),
    name,
    age,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };
  const selectedCrush = crushFile.find((crush) => parseInt(id, 10) === crush.id);
  crushFile.splice(selectedCrush.id - 1, 1, newCrush);
  writeFile(crushFilePath, crushFile);
  res.status(200).json(newCrush);
}));

app.get('/crush/:id', middlewares.auth, rescue(async (req, res) => {
  const { id } = req.params;
  const crushFile = JSON.parse(await readFile(crushFilePath));
  const selectedCrush = crushFile.find((crush) => parseInt(id, 10) === crush.id);
  if (selectedCrush) {
    res.status(200).json(selectedCrush);
  } else {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
}));

app.delete('/crush/:id', middlewares.auth, rescue(async (req, res) => {
  const { id } = req.params;
  const crushFile = JSON.parse(await readFile(crushFilePath));
  const newCrushFile = crushFile.filter((crush) => crush.id !== parseInt(id, 10));
  writeFile(crushFilePath, newCrushFile);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
}));

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
