const express = require('express');
const randToken = require('rand-token');
const middleware = require('./middlewares');
const contatinho = require('./crush.json');

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

app.post(
  '/crush',
  middleware.token,
  middleware.name,
  middleware.age,
  middleware.date,
  (req, res, _next) =>
    res.status(201).json({
      id: contatinho.length + 1,
      name: req.body.name,
      age: req.body.age,
      date: {
        datedAt: req.body.date.datedAt,
        rate: req.body.date.rate,
      },
    }),
);

app.listen(3000, () => {
  console.log('O pai tá de olho na porta 3000');
});
