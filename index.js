const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const middlewares = require('./middlewares');

const app = express();
const PORT = 3000;
const token = crypto.randomBytes(8).toString('hex');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middlewares.auth, (_req, res, _next) => {
  res.status(200).json({ token });
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
