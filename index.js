const crypto = require('crypto');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const middlewares = require('./middlewares');
// const = readFile
// const length = crushes.length;

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

// app.post('/crush', middlewares.tokenValidation, middlewares.createCrush, rescue(async (req, res) => {
//   const readFromFile = await fs.readFile('./crush.json', 'utf8', (_err, data) => data);
//   const array = JSON.parse(readFromFile);

//   console.log(array);
//   const { name, age, date } = req.body;
//   const id = array.length + 1;
//   const newCrush = { id, name, age, date };
//   fs.writeFileSync(readFromFile, array);
//   array.push(newCrush);

//   console.log(newCrush);
//   return res.status(201).json(newCrush);
// }));

app.get('/crush', middlewares.tokenValidation, async (_req, res) => {
  const readFromFile = await fs.readFile('crush.json');
  console.log(readFromFile);
  const array = JSON.parse(readFromFile);
  // if (length === crushes.length) {
  //   return res.status(200).json([]);
  // }
  // if (cautchUp.length > 0) return res.status(200).json(cautchUp);
  res.status(200).json(array);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json(err);
  }
  return res.status(500).json({ status: 500, message: 'erro interno do servidor' });
});

app.listen(3000, () => console.log('ouvindo na porta 3000'));
