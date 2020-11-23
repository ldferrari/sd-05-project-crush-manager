const express = require('express');

const bodyParser = require('body-parser');

const loginMid = require('./middlewares/login');

const app = express();

app.use(bodyParser.json());

/* REQUISITO 1 - Crie o endpoint POST /login */
app.post('/login', loginMid);

/* ouvindo na porta 3000 */
app.listen(3000, () => console.log('A mãe tá on na porta 3000!'));

// não remova esse endpoint, eh para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
