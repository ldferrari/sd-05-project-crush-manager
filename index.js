const express = require('express');

const bodyparse = require('body-parser');

const middlewares = require('./middlewares');

const { lerCrush, gravarCrush } = require('./services/crushManager');

const app = express();

const PORT = 3000;

app.use(bodyparse.json());

// 1 - Crie o endpoint POST /login
app.post('/login', middlewares.loginValidator, middlewares.gerarToken);

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
  const index = conteudoAtual.findIndex(result => result.id === parseInt(id, 10) );
  if (!conteudoAtual[index]) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  return res.status(200).send(conteudoAtual[index]);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('ON LINE!'));
