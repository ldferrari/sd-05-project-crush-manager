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
    console.log(req.params);
    res.status(404).json({ message: 'Crush não encontrado' });
  }

  next();
};

module.exports = { byId };
