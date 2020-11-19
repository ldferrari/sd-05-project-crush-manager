const express = require('express');
const randToken = require('rand-token');
const middleware = require('./middlewares');

const app = express();
app.use(express.json());
const generateToken = randToken.generate(16);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', middleware.email, middleware.password, (req, res, _next) => {
  const newtoken = generateToken;
  res.json({ token: newtoken });
});

app.listen(3000, () => {
  console.log('O pai tá de olho na porta 3000');
});
