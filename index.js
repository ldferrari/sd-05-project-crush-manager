const express = require('express');
const middlewares = require('./middlewares');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.login);

app.listen (PORT, () => console.log(`Servidor rodando na porta ${PORT}`));