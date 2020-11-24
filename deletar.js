const express = require('express');

const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const writeFile = require('./services/writeFile');
const readFile = require('./services/readFile');

const crushList = './crush.json';

app.use(bodyParser.json());

app.put('/crush/:id', middlewares.authToken, middlewares.authName, middlewares.authAge, middlewares.authDate, rescue(async (req, res) => {
  const { name, age, date } = req.body;
  const crushFile = JSON.parse(await readFile(crushList));
  const crushFilter = crushFile.filter((crush) => parseInt(req.params.id, 10) !== crush.id);
  const updatedCrush = {
    id: parseInt(req.params.id, 10),
    name,
    age,
    date,
  };
  crushFilter.push(updatedCrush);
  writeFile(crushList, crushFilter);
  res.status(200).json(updatedCrush);
}));

app.delete('/crush/:id', middlewares.authToken, rescue(async (req, res) => {
  const crushFile = JSON.parse(await readFile(crushList));
  const crushNew = crushFile.filter((crush) => parseInt(req.params.id, 10) !== crush.id);
  writeFile(crushList, crushNew);
  res.status(200).json({ message: 'Crush deletado com sucesso!' });
}));
