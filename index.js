const express = require('express');
const middleware = require('./middlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middleware.testLogin);

app.post('/crush', middleware.token, middleware.dateNameAgeRate, middleware.file);

app.get('/crush', middleware.token, middleware.readCrushs);

app.listen(3000, () => {
  console.log('O pai tá de olho na porta 3000');
});
