const express = require('express');
const bodyParser = require('body-parser');

const { checkLogin } = require('./middlewares');
const { createToken } = require('./services');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', checkLogin, (_req, res) => {
  const token = createToken();
  return res.status(200).send(token);
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
