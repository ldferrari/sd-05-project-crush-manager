const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
//  rescue para fazer o try/catch de funções assíncronas.
const mid = require('./middleware');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.get('/crush/search', mid.auth, rescue(mid.searchTerm));
//  7 - Crie o endpoint GET /crush/search?q=searchTerm

app.post('/login', mid.login);
//  1 - Crie o endpoint POST /login

app.post('/crush', mid.auth, mid.checkBodyStructure, rescue(mid.saveFile));
//  2 - Crie o endpoint POST /crush

app.get('/crush', mid.auth, rescue(mid.read));
//  3 - Crie o endpoint GET /crush

app.get('/crush/:id', mid.auth, rescue(mid.searchId));
//  4 - Crie o endpoint GET /crush/:id

app.put('/crush/:id', mid.auth, mid.checkBodyStructure, rescue(mid.update));
//  5 - Crie o endpoint PUT /crush/:id

app.delete('/crush/:id', mid.auth, rescue(mid.del));
//  6 - Crie o endpoint DELETE /crush/:id

app.listen(PORT, () => {
  console.log(`Estou monitorando a porta ${PORT}`);
});

//  ref1: https://www.npmjs.com/package/crypto-extra
//  ref2: https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
//  ref3: https://qastack.com.br/programming/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js
