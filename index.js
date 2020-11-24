const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const { createToken } = require('./services');
const { checkLogin, checkToken, findCrush, searchCrush } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', checkLogin, (_req, res) => {
  const token = createToken();
  res.status(200).send(token);
});

app.get('/crush/search', checkToken, searchCrush);

app.get('/crush/:id', checkToken, findCrush);

app.get('/crush', checkToken, async (_req, res) => {
  const myCrushes = await fs.readFile('./crush.json', 'utf8');
  res.status(200).send(JSON.parse(myCrushes));
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
