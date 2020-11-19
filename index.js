const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const generateToken = require('./services/generate-token');
const readFile = require('./services/readFile');
const writeFile = require('./services/writeFile');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.validateEmail, middlewares.validatePassword, (req, res) => {
  res.status(200).json({ token: generateToken() });
});

app.post('/crush', middlewares.auth, middlewares.validateName, middlewares.validateAge, middlewares.validateDate, async (req, res) => {
  const { name, age, date } = req.body;
  const crushFilePath = './crush.json';
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
  // JSON.stringify(crushFile);
  writeFile(crushFilePath, crushFile);
  res.status(201).json(newCrush);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
