const express = require('express');
const bodyParser = require('body-parser');

const { createToken, readFile } = require('./services');
const { checkLogin, checkToken, getCrushById } = require('./middlewares');

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

app.get('/crush/:id', checkToken, getCrushById, async (req, res) => {
  const myCrushes = JSON.parse(await readFile('./crush.json'));
  const { id } = req.params;
  const crushId = parseInt(id, 10);
  const findMyCrush = myCrushes.find((crush) => crush.id === crushId);

  return res.status(200).json(findMyCrush);
});

app.get('/crush/search', checkToken, async (req, res) => {
  const { q } = req.query;
  const myCrushes = JSON.parse(await readFile('./crush.json'));
  const findMyCrushes = myCrushes.filter((crush) => crush.name.includes(q));

  return !q || q === '' ? res.status(200).json(myCrushes) : res.status(200).json(findMyCrushes);
});

app.get('/crush', checkToken, async (_req, res) => {
  const myCrushes = JSON.parse(await readFile('./crush.json'));
  return res.status(200).json(myCrushes);
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
