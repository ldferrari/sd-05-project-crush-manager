const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const middlewares = require('./middlewares');

const { readCrush } = require('./services/crud');

app.use(bodyParser.json());

// REQUISITO 1 - crie o endpoint POST /login
app.post('/login', middlewares.login);

// REQUISITO 2 - crie o endpoint POST /crush
app.post(
  '/crush',
  middlewares.auth,
  middlewares.validCrush,
  middlewares.createCrush,
);

// REQUISITO 3 - crie o endpoint GET /crush
app.get('/crush', middlewares.auth, async (_req, res) => {
  const allCrushes = await readCrush();
  res.status(200).json(allCrushes);
});

// REQUISITO 7 - crie o endpoint GET /crush/search?q=searchTerm
// rota: esse endpoint precisa ficar antes do caminho /crush/:id
app.get('/crush/search', middlewares.auth, middlewares.searchCrush);

// REQUISITO 4 - crie o endpoint GET /crush/:id
app.get('/crush/:id', middlewares.auth, middlewares.getCrushById);

// REQUISITO 5 - crie o endpoint PUT /crush/:id
app.put('/crush/:id', middlewares.auth, middlewares.validCrush, middlewares.updateCrush);

// REQUISITO 6 - crie o endpoint DELETE /crush/:id
app.delete('/crush/:id', middlewares.auth, middlewares.deleteCrush);

// ouvindo na porta 3000
app.listen(3000, () => console.log('A mãe tá on na porta 3000!'));

// não remova este endpoint, ele é necessário para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
