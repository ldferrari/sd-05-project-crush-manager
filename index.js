const express = require('express');

const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const generateToken = require('./services/generate-token');
const writeFile = require('./services/writeFile');
const crushList = './crush.json';

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.authLogin, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

app.post('/crush', middlewares.authCrush, middlewares.authName, middlewares.authAge, middlewares.authDate, rescue(async (req, res) => {
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

const PORT = 3000;

app.listen(3000, () => console.log(`Ouvindo a porta ${PORT}`));
