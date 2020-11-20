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

app.get('/crush/search', middlewares.queryCrushs);

app.get('/crush/:id', middlewares.getOneCrush);

app.put('/crush/:id', middlewares.CrushValidate, middlewares.editCrush);

app.delete('/crush/:id', middlewares.deleteCrush);

app.get('/crush', middlewares.getAllCrushs);

app.post('/crush', middlewares.CrushValidate, middlewares.newCrushAdd);

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(3000, () => console.log('o pai tá ON'));
