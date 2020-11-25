const express = require('express');

const app = express();
// Importação e use - bodyParser boa prática seu uso
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const { readCrush } = require('./services/crud');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// 1 - Crie o endpoint POST/Login

app.post('/login', middlewares.login);

// 7 - SearchTerm

// 4 - Crie o endpoint GET /crush/:id
app.get('/crush/:id', middlewares.auth, middlewares.getById);

// 3 - Crie o endpoint GET /crush
app.get('/crush', middlewares.auth, async (_req, res) => {
  const arrayCrush = await readCrush();
  res.status(200).json(arrayCrush);
});

// 2 - Crie o endpoint POST /crush
app.post('/crush', middlewares.auth, middlewares.checkCrush, middlewares.newCrush);

// 5 - Crie o endpoint PUT /crush/:id
app.put('/crush/:id', middlewares.auth, middlewares.checkCrush, middlewares.updateCrush);

// 6 - Crie o endpoint DELETE /crush/:id
app.delete('/crush/:id', middlewares.auth, middlewares.excludeCrush);

// PORT listening
const PORT = 3000;
app.listen(PORT, () => console.log(`${PORT} chegou no crush!`));
