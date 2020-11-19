const express = require('express');
const PORT = 3000;
const app = express();
const middlewares = require('./middlewares');
const { MD5 } = require('crypto-js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.loginAuth, (req, res) => {
  const body = req.body;
  const token = MD5(body.email).toString().substr(0, 16);
  res.status(200).json({ token });
});

app.use(middlewares.errMiddleware);

app.listen(PORT, function () {
  console.log('ouvindo a porta 3000');
});
