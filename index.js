const bodyParser = require('body-parser');
const express = require('express');
const { auth, error, email, password, name, age, date, getCrush, createCrush } = require('./middlewares');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', email, password, (_req, _res, next) => next());

app.post('/crush', auth, name, age, date, createCrush, (_req, _res, next) => next());

app.get('/crush', auth, getCrush, (_req, _res, next) => next());


app.listen(PORT, () => {
  console.log(`hi lorena ${PORT}`);
});

app.use(error);
