const express = require('express');

const app = express();

// bodyParser como boas praticas contra vunerabilidade e segurança
const bodyParser = require('body-parser');

// use bodyParser
app.use(bodyParser.json());

// require da pasta de middlewares
const middlewares = require('./middlewares');

// REQUISITO 1
// POST (cria) um login
app.post('/login', middlewares.login);

// ---------------------------------------------------------------------------------------------
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// ---------------------------------------------------------------------------------------------

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
