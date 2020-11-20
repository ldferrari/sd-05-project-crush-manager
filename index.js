const express = require('express');

const app = express();
// Importação e use - bodyParser boa prática seu uso
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
// const { readCrush } = require('./services/crudFunctions') //FAZER ESTA FUNCAO

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

// 1 - Crie o endpoint POST/Login

app.post('/login', middlewares.login);

// PORT listening
const PORT = 3000;
app.listen(PORT, () => console.log(`${PORT} chegou no crush!`));
