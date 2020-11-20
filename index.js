const randtoken = require('rand-token');
const rescue = require('express-rescue');
const fs = require('fs');
const express = require('express');
const middleware = require('./middlewares');

const app = express();
const PORT = 3000;
const genToken = randtoken.generate(16);

const lerArquivo = middleware.readF;

const { checkAge, checkDate, checkEmail, checkId, checkName, checkPass, checkToken } = middleware;

function writingFiles(file) {
  fs.writeFile('./crush.json', file, (err) => {
    if (err) return console.log(err);
  });
}

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post(
  '/login',
  checkEmail,
  checkPass,
  rescue(async (req, res, _next) => {
    const uniqToken = genToken;
    await res.json({
      token: uniqToken,
    });
  }),
);

app.post(
  '/crush',
  checkToken,
  checkName,
  checkAge,
  checkDate,
  rescue(async (req, res, _next) => {
    await lerArquivo('./crush.json')
      .then((result) => {
        const { name, age, date } = req.body;
        const file = JSON.parse(result);
        const id = file.length + 1;
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
      })
      .catch(() => console.log('ERROR: POST'));
  }),
);

app.get(
  '/crush',
  checkToken,
  rescue(async (_req, res, _next) => {
    await lerArquivo('./crush.json')
      .then((result) => {
        res.status(200).json(JSON.parse(result));
      })
      .catch(() => console.log('ERROR : Getall'));
  }),
);

app.get(
  '/crush/:id',
  checkToken,
  checkId,
  rescue(async (req, res, _next) => {
    const auxId = parseInt(req.params.id, 10);
    await lerArquivo('./crush.json')
      .then((result) => {
        const re = JSON.parse(result);
        const indice = re.findIndex(({ id }) => id === auxId);
        res.status(200).json({
          id: re[indice].id,
          name: re[indice].name,
          age: re[indice].age,
          date: {
            datedAt: re[indice].date.datedAt,
            rate: re[indice].date.rate,
          },
        });
      })
      .catch(() => console.log('ERROR: Get by id'));
  }),
);

app.put(
  '/crush/:id',
  checkToken,
  checkName,
  checkAge,
  checkDate,
  checkId,
  rescue(async (req, res, _next) => {
    await lerArquivo('./crush.json')
      .then((result) => {
        const { name, age, date } = req.body;
        const auxId = parseInt(req.params.id, 10);
        const indice = JSON.parse(result).findIndex(({ id }) => id === auxId);
        const file = JSON.parse(result);
        file[indice] = { name, age, id: auxId, date };
        // console.log(file);
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
      })
      .catch((err) => console.log(`ERROR PUT:${err}`));
  }),
);
app.delete(
  '/crush/:id',
  checkId,
  checkToken,
  rescue(async (req, res, _next) => {
    await lerArquivo('./crush.json').then((result) => {
      const auxId = parseInt(req.params.id, 10);
      const auxArray = JSON.parse(result);
      auxArray.filter((elemento) => elemento.id !== auxId);
      writingFiles(JSON.stringify(auxArray));
      res.status(200).json({
        message: 'Crush deletado com sucesso',
      });
    });
  }),
);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
