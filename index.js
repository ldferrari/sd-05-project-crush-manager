const express = require('express');

const app = express();

const routeSignup = require('./routeSignup');

const PORT = 3000;

app.use(express.json());

app.use('/login', routeSignup);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// -----------------------------------------------

app.listen(PORT, () => {
  console.log('O pai tá ON no projeto');
});
