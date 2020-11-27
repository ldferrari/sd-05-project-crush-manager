const crypto = require('crypto');

const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const middlewares = require('./middlewares');
const crushes = require('./crush.json');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.login, rescue(async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
}));

app.post('/crush', middlewares.tokenValidation, middlewares.createCrush, rescue(async (req, res) => {
  // console.log(req.headers.authorization);
  const newCrush = req.body;
  return res.status(201).json(newCrush);
}));

app.get('/crush', middlewares.tokenValidation, (_req, res) => {
  res.status(200).json(crushes);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json(err);
  }
  return res.status(500).json({ status: 500, message: 'erro interno do servidor' });
});

app.listen(3000, () => console.log('ouvindo na porta 3000'));
