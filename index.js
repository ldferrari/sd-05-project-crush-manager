const express = require('express');

const app = express();

// Importações e Uses
const bodyParser = require('body-parser');
// melhor prática que app.use(express.json())
const middlewares = require('./middlewares');
const { readCrushFile } = require('./services/crudFunctions');

app.use(bodyParser.json());

// ENDPOINTS

// 0 - Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// 1 - Crie o endpoint POST /login
app.post('/login', middlewares.logger);

// 7 - Crie o endpoint GET /crush/search?q=searchTerm
app.get('/crush/search', middlewares.auth, middlewares.searchTerm);

// 4 - Crie o endpoint GET /crush/:id
app.get('/crush/:id', middlewares.auth, middlewares.findById);

// 3 - Crie o endpoint GET /crush
app.get('/crush', middlewares.auth, async (_req, res) => {
  const crushList = await readCrushFile();
  res.status(200).json(crushList);
});

// 2 - Crie o endpoint POST /crush
app.post('/crush', middlewares.auth, middlewares.checkCrush, middlewares.addCrush);

// 5 - Crie o endpoint PUT /crush/:id
app.put('/crush/:id', middlewares.auth, middlewares.checkCrush, middlewares.editCrush);

// 6 - Crie o endpoint DELETE /crush/:id
app.delete('/crush/:id', middlewares.auth, middlewares.deleteCrush);

// Port listening
const PORT = 3000;
app.listen(PORT, () => console.log(`${PORT} port OK!`));

// [ Honestidade acadêmica ] -
// Pairprogramming dos reqs 1 - 2 com o aluno Paulo Dandrea.
// Consulta do code da aula express CRUD:
// Link https://github.com/tryber/sd-05-live-lectures/pull/49/files .

// [ Melhorias possíveis do projeto ] -
// Usar nomes Create Read Update Delete em vez de Add Read Edit Delete.
// Centralizar apenas uma function writeFile para todos CRUDs.
// Criar middlewares de erro - app.use(middlewares.error) em fim de arquivo.
// Integrar rescue - nos endpoints e const rescue = require('express-rescue').
