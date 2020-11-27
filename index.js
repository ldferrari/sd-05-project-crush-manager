const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const middlewares = require('./middlewares');

const { readCrush } = require('./services/crud');

app.use(bodyParser.json());

// REQUISITO 1 - Crie o endpoint POST /login
app.post('/login', middlewares.login);

// REQUISITO 3 - Crie o endpoint GET /crush.
app.get('/crush', middlewares.auth, async (_req, res) => {
  const arrayCrush = await readCrush();
  res.status(200).json(arrayCrush);
});

// REQUISITO 2 - 2 - Crie o endpoint POST /crush
app.post(
  '/crush',
  middlewares.auth,
  middlewares.checkCrush,
  middlewares.newCrush,
);

// ouvindo na porta 3000
app.listen(3000, () => console.log('A mãe tá on na porta 3000!'));

// não remova este endpoint, ele é necessário para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
