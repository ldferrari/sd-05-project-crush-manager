const express = require('express');
const bodyparser = require('body-parser');
const { genToken, readFile, writeFile } = require('./services');
const {
  checkLogin,
  checkToken,
  checkCrushId,
  checkCrushAge,
  checkRateDate,
  checkCrushName,
} = require('./middlewares');

const app = express();
app.use(bodyparser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', checkLogin, (_req, res) => {
  const newToken = genToken();
  res.status(200).send(newToken);
});

app.get('/crush', checkToken, async (_req, res) => {
  const crushs = JSON.parse(await readFile('./crush.json'));
  return res.status(200).json(crushs);
});

app.post('/crush', checkToken, checkCrushName, checkRateDate, checkCrushAge, async (req, res) => {
  const crushs = JSON.parse(await readFile('./crush.json'));
  const crush = req.body;
  crush.id = crushs.length + 1;
  crushs.push(crush);

  await writeFile('./crush.json', crushs);

  return res.status(201).json(crush);
});

app.get('/crush/:id', checkToken, checkCrushId, async (req, res) => {
  const crushs = JSON.parse(await readFile('./crush.json'));
  const { id } = parseInt(req.params, 10);
  const crushFound = crushs.find((crush) => crush.id === id);
  return res.status(200).json(crushFound);
});

app.put('/crush/:id', checkToken, checkCrushName, checkCrushAge, checkRateDate, checkCrushId, async (req, res) => {
  const { name, age, date } = req.body;
  const crushList = JSON.parse(await readFile('./crush.json'));
  const { id } = parseInt(req.params, 10);
  const crushEdited = crushList.findIndex((crush) => crush.id === id);
  crushList[crushEdited] = { name, age, date, id };

  await writeFile('./crush.json', crushList);

  return res.status(200).json(crushList[crushEdited]);
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
