const express = require('express');

const app = express();

// Importações

// Port listening
const PORT = 3000;
app.listen(PORT, () => console.log('3000 port OK!'));

// Middlewares diversos

// ENDPOINTS

// 0 - não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});



// Middlewares de erro
