const express = require('express');
const fs = require('fs').promises;

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const byId = async (req, res, next) => {
  const { id } = req.params;
  const crushs = await fs.readFile('./crush.json', 'utf8');
  const list = JSON.parse(crushs);

  if (list[id - 1] === undefined) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }

  next();
};

module.exports = { byId };
