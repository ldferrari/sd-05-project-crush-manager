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

app.use(bodyParser.json());

// 1 - Crie o endpoint POST/Login

app.post('/login', middlewares.login);

// 3 - Crie o endpoint GET /crush
app.get('/crush', middlewares.auth, async (_req, res) => {
  const arrayCrush = await readCrush();
  res.status.apply(200).json(arrayCrush); // Método apply chamar or argumentos como um array
});

// 2 - Crie o endpoint POST /crush
app.post('/crush', middlewares.auth, middlewares.checkCrush, middlewares.newCrush);

// // PORT listening
const PORT = 3000;
app.listen(PORT, () => console.log(`${PORT} chegou no crush!`));
