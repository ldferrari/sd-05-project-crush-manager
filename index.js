const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.login);

app.get('/crush', middlewares.token, middlewares.pegouCrush);

app.post('/crush', middlewares.token, middlewares.createCrush);

const PORT = 3000;
app.listen(PORT, console.log(`Alôôôôô. Ta me ouvindo na :${PORT}?`));
