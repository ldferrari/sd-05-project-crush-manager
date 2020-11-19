const express = require('express');

const app = express();

// Importações e Uses
const bodyParser = require('body-parser'); // melhor prática que app.use(express.json())
// const rescue = require('express-rescue');
const middlewares = require('./middlewares');
const { readCrushFile } = require('./services/addCrushFunctions');

app.use(bodyParser.json());

// ENDPOINTS
// 0 - Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// 1 - Crie o endpoint POST /login
app.post('/login', middlewares.logger);

// 2 - Crie o endpoint POST /crush
app.post('/crush', middlewares.auth, middlewares.checkCrush, middlewares.addCrush);

// 3 - Crie o endpoint GET /crush
app.get('/crush', middlewares.auth, async (_req, res) => {
  const crushList = await readCrushFile();
  res.status(200).json(crushList);
});

// Middlewares de erro
// app.use(middlewares.error);

// Port listening
const PORT = 3000;
app.listen(PORT, () => console.log(`${PORT} port OK!`));

// [ Honestidade acadêmica ] -
// Projeto parcialmente desenvolvido em pair programming
// com os alunos Paulo Dandrea e Natalia Macedo.
