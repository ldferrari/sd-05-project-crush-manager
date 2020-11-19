const express = require('express');

const app = express();

const mid = require('./middleware');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', mid.login);

app.post('/crush', mid.auth, mid.create, mid.saveFile);

app.get('/crush', mid.auth, mid.read);

app.get('/crush/:id', mid.auth, mid.searchId);

app.put('/crush/:id', mid.auth, mid.create, mid.update);

app.listen(3000, () => {
  console.log('Estou monitorando a porta 3000');
});

//  ref1: https://www.npmjs.com/package/crypto-extra
//  ref2: https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
