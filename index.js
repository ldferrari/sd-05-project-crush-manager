const randtoken = require('rand-token');
const fs = require('fs');
const express = require('express');
const middleware = require('./middlewares');

const app = express();
const PORT = 3000;
const genToken = randtoken.generate(16);
const crushs = require('./crush.json');

const teste = middleware.readF;

const { checkAge, checkDate, checkEmail, checkId, checkName, checkPass, checkToken } = middleware;
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
app.post('/login', checkEmail, checkPass, (req, res, _next) => {
  const uniqToken = genToken;
  res.json({
    token: uniqToken,
  });
});
app.post('/crush', checkToken, checkName, checkAge, checkDate, async (req, res, _next) => {
  teste('./crush.json').then(async (result) => {
    const { name, age, date } = req.body;
    const id = JSON.parse(result).length + 1;
    const file = JSON.parse(result);
    file.push({ name, age, id, date });
    // console.log(file);
    writingFiles(JSON.stringify(file));
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
});
app.get('/crush', checkToken, async (req, res, _next) => {
  teste('./crush.json').then((result) => {
    res.status(200).json(JSON.parse(result));
  });
});
app.get('/crush/:id', checkToken, checkId, async (req, res, _next) => {
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
  checkToken,
  checkName,
  checkAge,
  checkDate,
  checkId,
  async (req, res, _next) => {
    teste('./crush.json').then((result) => {
      const { name, age, date } = req.body;
      const auxId = parseInt(req.params.id, 10);
      const indice = JSON.parse(result).findIndex(({ id }) => id === auxId);
      const file = JSON.parse(result);
      file[indice] = { name, age, id: auxId, date };
      console.log(file);
      writingFiles(JSON.stringify(file));
      res.status(200).json({
        id: JSON.parse(result)[indice].id,
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
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
