const express = require('express');

const app = express();

const mid = require('./middleware');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', mid.login);
//  1 - Crie o endpoint POST /login

app.post('/crush', mid.auth, mid.create, mid.saveFile);
//  2 - Crie o endpoint POST /crush

app.get('/crush', mid.auth, mid.read);
//  3 - Crie o endpoint GET /crush

app.get('/crush/:id', mid.auth, mid.searchId);
//  4 - Crie o endpoint GET /crush/:id

app.put('/crush/:id', mid.auth, mid.create, mid.update);
//  5 - Crie o endpoint PUT /crush/:id

app.delete('/crush/:id', mid.auth, mid.del);
//  6 - Crie o endpoint DELETE /crush/:id

// app.get('/crush/', mid.auth, mid.searchTerm);
// //  7 - Crie o endpoint GET /crush/search?q=searchTerm

app.listen(3000, () => {
  console.log('Estou monitorando a porta 3000');
});

//  ref1: https://www.npmjs.com/package/crypto-extra
//  ref2: https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
