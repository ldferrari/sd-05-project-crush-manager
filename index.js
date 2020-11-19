const randtoken = require('rand-token');
const express = require('express');
const middleware = require('./middlewares');

const app = express();
const PORT = 3000;
const genToken = randtoken.generate(16);
const crushs = require('./crush.json');

console.log(crushs.length);

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.post('/login', middleware.checkEmail, middleware.checkPass, (req, res, _next) => {
  const uniqToken = genToken;
  res.header({ Authorization: uniqToken }).json({
    token: uniqToken,
  });
});
app.post(
  '/crush',
  middleware.checkToken,
  middleware.checkName,
  middleware.checkAge,
  middleware.checkDate,
  (req, res, _next) =>
    res.status(201).json({
      id: crushs.length + 1,
      name: req.body.name,
      age: req.body.age,
      date: {
        datedAt: req.body.date.datedAt,
        rate: req.body.date.rate,
      },
    }),
);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
