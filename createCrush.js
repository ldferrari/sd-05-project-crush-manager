const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const porta = 3000;

app.use(bodyParser.json());

app.post('/crush', (req, res, next) => {
  const { name } = req.body;
  if (name === '' || name === undefined) {
    res.status(400).send({ message: 'O campo "name" é obrigatório' });
  } else if (name.length < 3) {
    res
      .status(400)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else {
    next();
  }
});

app.post('/crush', (req, res, next) => {
  const { age } = req.body;
  if (age === '' || age === undefined) {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
  } else if (Number(age) < 18) {
    res.status(400).send({ message: 'O crush deve ser maior de idade' });
  } else {
    next();
  }
});

app.post('/crush', (req, res, next) => {
  const { date } = req.body;
  const { datedAt, rate } = req.body.date;
  if (
    date === undefined || date === '' || datedAt === undefined || datedAt === '' || rate === undefined || rate === ''
  ) {
    res
      .status(400)
      .send({
        message:
          'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      });
  } else {
    next();
  }
});

app.post('/crush', (req, res, next) => {
  const { datedAt } = req.body.date;
  const dataForm = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  // esse regex acima valida a data com dois numeros de 1 a 9, dois numeros de
  // 1 a 9 e 4 numeros de 1 a 9
  // fonte: https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656/2
  if (!dataForm.test(datedAt)) {
    res
      .status(400)
      .send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  } else {
    next();
  }
});

app.post('/crush', (req, res, next) => {
  const { rate } = req.body.date;
  const rateForm = /^[1-5]{1}$/;
  if (!rateForm.test(rate)) {
    res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } else {
    next();
  }
});

app.post('/crush', (req, res, next) => {
  const { token } = req.headers;
  if (token === undefined) {
    res.status(401).send({ message: 'Token não encontrado' });
  } else if (token.length !== 16) {
    res.status(401).send({ message: 'Token inválido' });
  } else {
    next();
  }
});

app.post('/crush', (req, res) => {
  res.status(201).send(req.body);
});

app.listen(porta, () => {
  console.log(`on na porta ${porta}`);
});
