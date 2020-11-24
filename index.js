const express = require('express');
const fs = require('fs');
const path = require('path');
const { MD5 } = require('crypto-js');

const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

app.use(bodyParser.json());

const idd = 4;

const db = async () => JSON.parse(fs.readFileSync(path.join(__dirname, 'crush.json'), 'utf8'));
const changeDb = async (newDB) =>
  fs.writeFileSync(path.join(__dirname, '..', 'crush.json'), String(newDB), 'utf8');

const updateDB = async (id, name, age, date) => {
  const dbs = await db();
  const newDBS = dbs.filter((i) => i.id !== id);
  newDBS.push({ id, name, age, date });
  /* const newDBS = dbs.foreach((i, index) => {
    if (i.id === parseInt(id, 10)) {
      i[index] = {
        id,
        name,
        age,
        date,
      };
    }
  }); */
  await changeDb(newDBS);
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.loginAuth, (req, res) => {
  const { body } = req;
  const { email } = body;
  const token = MD5(email).toString().substr(0, 16);
  res.status(200).json({ token });
});

app.post('/crush', middlewares.createCrushAuth, (req, res) => {
  res.status(201).json({ ...req.body, id: idd + 1 });
});

app.get('/crush', middlewares.getAllCrushs, async (_req, res) => {
  const dbs = await db();
  console.log(dbs);
  res.status(200).json(dbs);
});

app.get('/crush/:id', middlewares.getAllCrushs, async (req, res) => {
  const dbs = await db();
  const { id } = req.params;
  const crushFound = dbs.find((i) => i.id === parseInt(id, 10));
  if (!crushFound) {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(200).json(crushFound);
});

app.put('/crush/:id', middlewares.createCrushAuth, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { name, age, date } = body;
  await updateDB(id, name, age, date);
  const idds = parseInt(id, 10);
  res.status(200).json({ ...body, id: idds });
});

app.delete('/crush/:id', middlewares.getAllCrushs, async (req, res) => {
  const { id } = req.params;
  const dbs = await db();
  const newDB = dbs.filter((i) => i.id !== id);
  changeDb(newDB);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.use(middlewares.errMiddleware);

app.listen(PORT, () => {
  console.log('ouvindo porta 3000');
});
