const express = require('express');
const helpers = require('./helpers/tokenGenerator');
const middlewares = require('./middlewares/index');
const parser = express.json();
const PORT = 3000;

const app = express();
app.use(parser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.emailValidator, (req, res) => {
  const token = helpers.tokenGenerator(16);
  res.send({ token });
});

app.listen(PORT, () => {
  console.log('O PAI TÁ ON NA PORTA %s', PORT);
});
