const express = require('express');
const helpers = require('./helpers/index');
const middlewares = require('./middlewares/index');

const parser = express.json();
const PORT = 3000;

const app = express();
app.use(parser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.emailValidator, (req, res) => {
  const token = helpers.tokenGenerator(16);
  res.send({ token });
});

app.post('/crush', middlewares.authorization, middlewares.createCrushValidator, middlewares.dateValidator, async (req, res) => res.status(201).send(await helpers.createCrush(req.body)));

app.get('/crush', middlewares.authorization, async (req, res) => {
  res.json(await helpers.readCrush());
});

app.get('/crush/:id', middlewares.authorization, async (req, res) => {
  const crush = await helpers.findCrushById(req.params.id);
  if (!crush) res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).json(crush);
});

app.put('/crush/:id', middlewares.authorization, middlewares.createCrushValidator, middlewares.dateValidator, async (req, res) => {
  await helpers.deleteCrushById(req.params.id);
  await helpers.createCrush(req.body, req.params.id);
  const crushUpdated = helpers.createProfile(req.body, parseInt(req.params.id, 10));
  res.status(200).json(crushUpdated);
});

app.delete('/crush/:id', middlewares.authorization, async (req, res) => {
  await helpers.deleteCrushById(req.params.id);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.listen(PORT, () => {
  console.log('O PAI TÁ ON NA PORTA %s', PORT);
});
