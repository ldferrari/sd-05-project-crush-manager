const express = require('express');

const bodyparse = require('body-parser');

const middlewares = require('./middlewares');

const { lerCrush, gravarCrush } = require('./services/crushManager');

const app = express();

const PORT = 3000;

app.use(bodyparse.json());

// 1 - Crie o endpoint POST /login
app.post('/login', middlewares.loginValidator, middlewares.gerarToken);

// 7 - Crie o endpoint GET /crush/search?q=searchTerm
app.get('/crush/search', middlewares.auth, (req, res) => {
  const { q } = req.query;
  const data = lerCrush();
  const searchTerm = data.filter((crush) => crush.name.includes(q));
  if (searchTerm.length === 0) {
    return res.status(404).json({ message: 'nome não encontrado' });
  }
  return res.status(200).json(searchTerm);
});

// 2 - Crie o endpoint POST /crush
app.post('/crush', middlewares.auth, middlewares.validarCrush, (req, res, _next) => {
  const { name, age, date } = req.body;
  const data = lerCrush();
  const id = 1 + data.reduce((max, actual) =>
    (actual.id > max ? actual.id : max), 0);
  const newCrush = { name, age, id, date };
  data.push(newCrush);
  gravarCrush(JSON.stringify(data));
  return res.status(201).json(newCrush);
});

// 3 - Crie o endpoint GET /crush
app.get('/crush', middlewares.auth, (_req, res, _next) => {
  const data = lerCrush();
  res.status(200).json(data);
});

// 4 - Crie o endpoint GET /crush/:id
app.get('/crush/:id', middlewares.auth, (req, res, _next) => {
  const conteudoAtual = lerCrush();
  const { id } = req.params;
  const index = conteudoAtual.findIndex((result) => result.id === parseInt(id, 10));
  if (!conteudoAtual[index]) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  return res.status(200).send(conteudoAtual[index]);
});

// 5 - Crie o endpoint PUT /crush/:id
app.put('/crush/:id', middlewares.auth, middlewares.validarCrush, (req, res) => {
  const { name, age, date } = req.body;
  const id = parseInt(req.params.id, 10);
  const data = lerCrush();
  const crushEncontrado = data.find((crush) => crush.id === id);
  const index = data.indexOf(crushEncontrado);
  data[index] = { id, name, age, date };
  gravarCrush(JSON.stringify(data));
  return res.status(200).json({ id, name, age, date });
});

// 6 - Crie o endpoint DELETE /crush/:id
app.delete('/crush/:id', middlewares.auth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const conteudoAtual = lerCrush();
  const listaNova = conteudoAtual.filter((crush) => crush.id !== id);
  gravarCrush(JSON.stringify(listaNova));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('ON LINE!'));
