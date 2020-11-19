const randtoken = require('rand-token');
const fs = require('fs');
const express = require('express');
const middleware = require('./middlewares');

const app = express();
const PORT = 3000;
const genToken = randtoken.generate(16);
const crushs = require('./crush.json');

const teste = middleware.readF;

async function writingFiles(file) {
  await fs.writeFile('./crush.json', file, (err) => {
    if (err) return console.log(err);
  });
}

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.post('/login', middleware.checkEmail, middleware.checkPass, (req, res, _next) => {
  const uniqToken = genToken;
  res.json({
    token: uniqToken,
  });
});
app.post(
  '/crush',
  middleware.checkToken,
  middleware.checkName,
  middleware.checkAge,
  middleware.checkDate,
  async (req, res, _next) => {
    teste('./crush.json').then(async (result) => {
      const { name, age, date } = req.body;
      const id = JSON.parse(result).length + 1;
      const file = JSON.parse(result);
      file.push({ name, age, id, date });
      // console.log(file);
      await writingFiles(JSON.stringify(file));
      res.status(201).json({
        id: JSON.parse(result).length + 1,
        name: req.body.name,
        age: req.body.age,
        date: {
          datedAt: req.body.date.datedAt,
          rate: req.body.date.rate,
        },
      });
    });
  },
);
app.get('/crush', middleware.checkToken, async (req, res, _next) => {
  await teste('./crush.json').then((result) => {
    res.status(200).json(JSON.parse(result));
  });
});
app.get('/crush/:id', middleware.checkToken, middleware.checkId, async (req, res, _next) => {
  const auxId = parseInt(req.params.id, 10);
  const indice = crushs.findIndex(({ id }) => id === auxId);
  await res.status(200).json({
    id: crushs[indice].id,
    name: crushs[indice].name,
    age: crushs[indice].age,
    date: {
      datedAt: crushs[indice].date.datedAt,
      rate: crushs[indice].date.rate,
    },
  });
});
app.put(
  '/crush/:id',
  middleware.checkToken,
  middleware.checkName,
  middleware.checkAge,
  middleware.checkDate,
  middleware.checkId,
  async (req, res, _next) => {
    const auxId = parseInt(req.params.id, 10);
    const indice = crushs.findIndex(({ id }) => id === auxId);
    await res.status(200).json({
      id: crushs[indice].id,
      name: req.body.name,
      age: req.body.age,
      date: {
        datedAt: req.body.date.datedAt,
        rate: req.body.date.rate,
      },
    });
  },
);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
