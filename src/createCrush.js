const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const createCrush = (req, res, next) => {
  const { date } = req.body;
  const dataForm = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  // esse regex acima valida a data com dois numeros de 1 a 9, dois numeros de
  // 1 a 9 e 4 numeros de 1 a 9
  // fonte: https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656/2
  const rateForm = /^[1-5]{1}$/;
  const { datedAt, rate } = date;

  if (
    datedAt === undefined || rate === undefined || datedAt === '' || rate === ''
  ) {
    res.status(400).send({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  if (!dataForm.test(datedAt)) {
    res
      .status(400)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!rateForm.test(rate)) {
    res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = { createCrush };
