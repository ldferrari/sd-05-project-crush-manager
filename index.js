const express = require('express');
const crypto = require('crypto');
const bodyparse = require('body-parser');

const { number } = require('joi');
const middlewares = require('./middlewares');
const { readingCrushFile, writingCrushFile } = require('./middlewares/addCrush');

const { tokenVal, nameVal, ageVal, dateVal } = middlewares.addCrush;

const PORT = 3000;
const app = express();
app.use(bodyparse.json());

app.post('/login', middlewares.login, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({
    token,
  });
});

app.get('/crush', tokenVal, async (_req, res, _next) => {
  let data = await readingCrushFile();
  data = data.data;
  res.status(200).json(data);
});

app.get('/crush/:id', tokenVal, async (req, res, _next) => {
  const { data } = await readingCrushFile();
  const { id } = req.params;
  const crush = data.find((person) => person.id === Number(id));
  if (crush === undefined) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(200).json(crush);
});

app.put('/crush/:id', tokenVal, nameVal, ageVal, dateVal, async (req, res, _next) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  const { data } = await readingCrushFile();
  const editedCrush = { name, age, id: Number(id), date };
  await writingCrushFile([...data.filter((crush) => crush.id !== Number(id)), editedCrush]);
  return res.status(200).json(editedCrush);
});

app.post('/crush', tokenVal, nameVal, ageVal, dateVal, async (req, res, _next) => {
  const { name, age, date } = req.body;

  const { data, id } = await readingCrushFile();
  const newCrush = { name, age, id, date };
  data.push(newCrush);
  await writingCrushFile(data);
  return res.status(201).json(newCrush);
});

app.listen(PORT, () => console.log(`Looking at port ${PORT}`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
