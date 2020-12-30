// Criação do /crush

// Primeiro passo: chamar o express
const express = require('express');

// Segundo passo: chamar o router serve para construção das rotas
const router = express.Router();

const moment = require('moment'); // importando a função que transforma em data

const fs = require('fs').promises; // importando o file-system. Deve ser importado como promisse
const path = require('path');

// function para ler o arquivo
const readCrushFile = async () => {
  // arquivo crush.json
  // .resolve: resolva esse caminho... | __dirname: a raiz das pastas
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8')); // retorna o conteudo do arquivo no formato utf-8
};

const writeCrushFile = async (content) =>
  fs.writeFile(path.resolve(__dirname, '.', 'crush.json'), JSON.stringify(content), (err) => {
    if (err) throw err;
  });

router.get('/', async (_req, res) => {
  const crush = await readCrushFile();
  res.status(200).json(crush);
}); // nao eh necessario colocar as condições de erro pois esta no arquivo token_middleware

router.post('/', async (req, res) => {
  const { name, age, date } = req.body;

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
    res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (!moment(date.datedAt, 'DD/MM/AAAA').isValid()) {
    // função padrão para transformar em formato de data
    res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (Number(date.rate) < 1 || Number(date.rate) > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  const oldCrush = await readCrushFile();
  const id = oldCrush.length + 1; // atribuindo ao id um numero = a posicao + 1
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
  res.status(201).json(newArrayOfCrush[id - 1]); // atribuindo a posicao exata do index
});

module.exports = router;
