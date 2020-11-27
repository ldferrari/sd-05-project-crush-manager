const express = require('express');
const bodyParser = require('body-parser');

const { createToken, readFile, writeFile } = require('./services');
const {
  checkLogin,
  checkToken,
  getCrushById,
  getCrushByAge,
  getCrushByName,
  getCrushByRate,
} = require('./middlewares');

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

app.get('/crush/search', checkToken, async (req, res) => {
  const { q } = req.query;
  const myCrushes = JSON.parse(await readFile('./crush.json'));
  const findMyCrushes = myCrushes.filter((crush) => crush.name.includes(q));

  return !q || q === '' ? res.status(200).json(myCrushes) : res.status(200).json(findMyCrushes);
});

app.get('/crush/:id', checkToken, getCrushById, async (req, res) => {
  const myCrushes = JSON.parse(await readFile('./crush.json'));
  const { id } = req.params;
  const crushId = parseInt(id, 10);
  const findMyCrush = myCrushes.find((crush) => crush.id === crushId);

  return res.status(200).json(findMyCrush);
});

app.get('/crush', checkToken, async (_req, res) => {
  const myCrushes = JSON.parse(await readFile('./crush.json'));
  return res.status(200).json(myCrushes);
});

app.put(
  '/crush/:id',
  checkToken,
  getCrushById,
  getCrushByRate,
  getCrushByAge,
  getCrushByName,
  async (req, res) => {
    const { name, age, date } = req.body;
    const id = parseInt(req.params.id, 10);
    const myCrushes = JSON.parse(await readFile('./crush.json'));
    const findMyCrush = myCrushes.findIndex((crush) => crush.id === id);
    myCrushes[findMyCrush] = { name, age, date, id };

    await writeFile('./crush.json', myCrushes);

    return res.status(200).json(myCrushes[findMyCrush]);
  },
);

app.post('/crush', checkToken, getCrushByName, getCrushByAge, getCrushByRate, async (req, res) => {
  const myCrushes = JSON.parse(await readFile('./crush.json'));
  const myCrush = req.body;
  myCrush.id = myCrushes.length + 1;
  myCrushes.push(myCrush);

  await writeFile('./crush.json', myCrushes);

  return res.status(201).json(myCrush);
});

app.delete('/crush/:id', checkToken, async (req, res) => {
  const myCrushes = JSON.parse(await readFile('./crush.json'));
  const { id } = req.params;
  const deleteCrush = myCrushes.filter((crush) => crush.id !== parseInt(id, 10));

  await writeFile('./crush.json', deleteCrush);

  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
