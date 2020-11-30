const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const validation = (req, res, next) => {
  const { name, age, date } = req.body;
  if (name === '' || name === undefined) {
    res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    res
      .status(400)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (age === '' || age === undefined) {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }

  if (date === undefined || date === '') {
    res.status(400).send({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

module.exports = { validation };
