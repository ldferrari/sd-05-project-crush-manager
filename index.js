const express = require('express');
const bodyParser = require('body-parser');

const { createToken, readFile } = require('./services');
const { checkLogin, checkToken } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/crush', checkToken, async (_req, res) => {
  const myCrushes = JSON.parse(await readFile('./crush.json'));
  return res.status(200).json(myCrushes);
});

app.post('/login', checkLogin, (_req, res) => {
  const token = createToken();
  res.status(200).send(token);
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
