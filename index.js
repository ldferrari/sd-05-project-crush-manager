const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./Middlewares');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

// 1 - Crie o endpoint POST /login

app.post('/login', middlewares.login);

app.listen(PORT, () => console.log(`We're in. Port ${PORT}`));
