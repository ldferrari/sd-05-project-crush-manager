const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const moment = require('moment');

const router = express.Router();

const readCrushFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

const writeCrushFile = async (content) => (
  fs.writeFile(path.resolve(__dirname, '.', 'crush.json'),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    })
);

router.get('/', async (_req, res) => {
  const crush = await readCrushFile();
  res.status(200).send(crush);
});

router.get('/:id', async (req, res) => {
  const { authorization } = req.headers;
  const crush = await readCrushFile();
  const { id } = req.params;

  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization && authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }
  
  const filteredCharacter = crush.find((character) => character.id === Number(id));
  if (filteredCharacter === undefined) return res.status(404).json({ message: 'Crush não encontrado'});
  res.status(200).json(filteredCharacter);
});

router.post('/', async (req, res) => {
  const { name, age, date } = req.body;
  // const { datedAt, rate } = date;
  const { authorization } = req.headers;
  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  if (!date || !date.datedAt || !date.rate) {
    res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (!moment(date.datedAt, 'DD/MM/AAAA').isValid()) {
    res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (Number(date.rate) < 1 || Number(date.rate) > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization && authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }

  const oldCrush = await readCrushFile();
  const id = oldCrush.length + 1;
  const { datedAt, rate } = date;
  const newArrayOfCrush = [
    ...oldCrush,
    {
      id,
      name,
      age,
      date: {
        datedAt,
        rate,
      },
    },
  ];
  await writeCrushFile(newArrayOfCrush);
  res.status(201).json(newArrayOfCrush[id - 1]);
});

module.exports = router;
