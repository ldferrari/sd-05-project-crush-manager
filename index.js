const express = require('express');

const app = express();
// app.use(express.json()); melhor pratica de usar bodyParser

// Importações
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

// Port listening
const PORT = 3000;
app.listen(PORT, () => console.log('3000 port OK!'));

// Middlewares diversos
app.use(bodyParser.json());
// app.use(middlewares.namemw);

// ENDPOINTS

// 0 - não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});



// Middlewares de erro
// app.use(middlewares.error);
