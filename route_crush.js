// Criação do /crush

// Primeiro passo: chamar o express
const express = require('express');

// Segundo passo: chamar o router serve para construção das rotas
const router = express.Router();

const fs = require('fs').promises; // importando o file-system. Deve ser importado como promisse
const path = require('path');

const checkCrushFields = require('./read_crush');

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

router.post('/', checkCrushFields, async (req, res) => {
  const { name, age, date } = req.body;

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

router.get('/search', async (req, res) => {
  const { q } = req.query;

  const readCrush = await readCrushFile(); // função readCrushFile linha 15

  const search = readCrush.filter((crush) => crush.name.includes(q));
  if (q === false) {
    return res.status(200).send(readCrush);
  }
  return res.status(200).send(search);
});

router.get('/:id', async (req, res) => {
  const crush = await readCrushFile();

  const searchCrush = crush.find((obj) => obj.id === Number(req.params.id));

  if (searchCrush === undefined) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(200).json(searchCrush);
});

router.put('/:id', checkCrushFields, async (req, res) => {
  const crush = await readCrushFile();
  // checando se o id existe com o find()
  const searchCrush = crush.find((obj) => obj.id === Number(req.params.id));

  if (searchCrush === undefined) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  const newCrush = crush.map((person) => {
    if (person.id === Number(req.params.id)) {
      return { ...req.body, id: Number(req.params.id) };
    }
    return person;
  });
  await writeCrushFile(newCrush);
  res.status(200).json({ ...req.body, id: Number(req.params.id) });
});

router.delete('/:id', async (req, res) => {
  const crush = await readCrushFile();
  // checando se o id existe com o find()
  const searchCrush = crush.find((obj) => obj.id === Number(req.params.id));

  if (searchCrush === undefined) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  const newCrush = crush.filter((person) => {
    if (person.id === Number(req.params.id)) {
      return false;
    }
    return person;
  });
  await writeCrushFile(newCrush);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

module.exports = router;
