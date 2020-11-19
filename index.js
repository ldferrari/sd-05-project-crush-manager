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

// 4 - Crie o endpoint GET /crush/:id
app.get('/crush/:id', middlewares.auth, middlewares.findById);

// 5 - Crie o endpoint PUT /crush/:id
app.put('/crush/:id', middlewares.auth, middlewares.checkCrush, middlewares.editCrush);

// 6 - Crie o endpoint DELETE /crush/:id
// app.delete('/crush/:id', middlewares.auth, middlewares.deleteCrush);

// Middlewares de erro
// app.use(middlewares.error);

// Port listening
const PORT = 3000;
app.listen(PORT, () => console.log(`${PORT} port OK!`));

// [ Honestidade acadêmica ] -
// Pairprogramming dos reqs 1 - 2 com o aluno Paulo Dandrea.
// Consulta do code da aula express CRUD:
// Link https://github.com/tryber/sd-05-live-lectures/pull/49/files .

// [ Melhorias possíveis ] -
// Usar nomes Create Read Update Delete em vez de Add Check Edit Delete.
