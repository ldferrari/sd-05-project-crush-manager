const express = require('express');

const PORT = 3000;
const app = express();
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const { MD5 } = require('crypto-js');
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.loginAuth, (req, res) => {
  const body = req.body;
  const { email } = body
  const token = MD5(email).toString().substr(0, 16);
  res.status(200).json({ token });
});

app.post('/crush', middlewares.crushAuth, (req, res) => {
  res.status(401).send(req);
})

app.use('/login', middlewares.loginErr);

app.listen(PORT, function () {
  console.log('ouvindo a porta 3000');
});
