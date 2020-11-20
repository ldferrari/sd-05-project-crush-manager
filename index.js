const express = require('express');
const bodyParser = require('body-parser');
// const crypto = require('crypto');

const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.auth);

app.post('/crush', middlewares.newCrushValidate, middlewares.newCrushAdd);

app.get('/crush', middlewares.getAllCrushs);

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('o pai tá ON'));
