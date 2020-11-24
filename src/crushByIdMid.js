const express = require('express');
const fs = require('fs').promises;

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const byId = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const crushs = await fs.readFile('./crush.json', 'utf8');
  const list = JSON.parse(crushs);

  if (authorization === undefined) {
    res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }

  if (list[id - 1] === undefined) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }

  next();
};

module.exports = { byId };
