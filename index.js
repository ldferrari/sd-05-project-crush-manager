const express = require('express');

const bodyparse = require('body-parser');

const middlewares = require('./middlewares');

const app = express();

const PORT = 3000;

app.use(bodyparse.json());

// 1 - Crie o endpoint POST /login
app.post('/login', middlewares.loginValidator,middlewares.gerarToken);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('ON LINE!'));
