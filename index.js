// [ Honestidade acadêmica ] -
// Projeto realizado Pair programming com a aluna Larissa Palombo #55
const express = require('express');

const app = express();
// bodyParser como boas praticas contra vunerabilidade e segurança
const bodyParser = require('body-parser');

// require da pasta de middlewares
const middlewares = require('./middlewares');
// const { readJSON } =require('./services/allCrush')

// use bodyParser
app.use(bodyParser.json());

// ---------------------------------------------------------------------------------------------
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// ---------------------------------------------------------------------------------------------

// REQUISITO 1
// POST (cria) um login
app.post('/login', middlewares.login);

// REQUISITO 2
// POST (cria) um novo crush
// 2 - Crie o endpoint POST /crush
app.post('/crush', middlewares.auth, middlewares.createCrush, middlewares.incrementJSON);

// REQUISITO 3
// GET do crush
app.get('/crush', middlewares.auth, middlewares.list);

// REQUISITO 7
// GET /crush/search?q=searchTerm
app.get('/crush/search', middlewares.auth, middlewares.searchTerm);

// REQUISITO 4
// GET /crush/:id
app.get('/crush/:id', middlewares.auth, middlewares.crushIdFind);

// REQUISITO 5
// PUT /crush/:id
app.put('/crush/:id', middlewares.auth, middlewares.createCrush, middlewares.updateCrush);

// REQUISITO 6
// endpoint DELETE /crush/:id
app.delete('/crush/:id', middlewares.auth, middlewares.deleteCrush);

// Port para escutar na porta 3000
const PORT = 3000;

// escutando porta PORT 3000
// app.listen(PORT, function () {
//   console.log('server is listeing on port 3000....XABLAU');
// });
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}....XABLAU`));

// como usar httpie
// bash> http "método-HTTP" :"número da porta"/endpoint requisições
// exemplo: http post :3000/login email=samueap@samueap.com password=123456
