// Codando junto com Samuel- peguei assinatura do Coruja haha
const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// requisito 1 - login
app.post('/login', middlewares.login);

// requisito 3 - ler todos os crush
app.get('/crush', middlewares.auth, middlewares.readList);

// requisito 7
app.get('/crush/search', middlewares.auth, middlewares.pesquisar);

// requisito 2 - criar novo crush
app.post('/crush', middlewares.auth, middlewares.createCrush, middlewares.novo);

// requisito 4
app.get('/crush/:id', middlewares.auth, middlewares.searchCrush);

// requisito 5
app.put('/crush/:id', middlewares.auth, middlewares.createCrush, middlewares.editCrush);

// requisito 6
app.delete('/crush/:id', middlewares.auth, middlewares.deleteCrush);

const PORT = 3000;
app.listen(PORT, console.log(`Toc toc, é o crush? ${PORT}`));
