const express = require('express');
const bodyParser = require('body-parser');
const { email, password, error, auth } = require('./middlewares');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`hi lorena ${PORT}`);
});

app.post('/login', email, password, (_req, _res, next) => {
  next();
});

app.post('/auth', auth);
