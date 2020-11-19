const express = require('express');

const app = express();

// Importações e Uses
const bodyParser = require('body-parser'); // melhor prática que app.use(express.json())
const middlewares = require('./middlewares');

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

// Middlewares de erro
// app.use(middlewares.error);

// Port listening
const PORT = 3000;
app.listen(PORT, () => console.log(`${PORT} port OK!`));

// [ Honestidade acadêmica ] -
// Projeto parcialmente desenvolvido em pair programming
// com os alunos Paulo Dandrea e Natalia Macedo.
