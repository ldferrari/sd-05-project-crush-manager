const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const generateToken = require('./services/generate-token');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', (_req, res, _next) => {
  res.send({ "token": generateToken() });
});

const PORT = 3000;

app.listen(3000, () => console.log(`Ouvindo a porta ${PORT}`));
