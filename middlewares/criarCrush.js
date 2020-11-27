const fs = require('fs').promises;
// const { writeFile } = require('fs');

const dataRegex = /^(0?[1-9]|[12][0-9]|3[01])[\\](0?[1-9]|1[012])[\\]\d{4}$/;

module.exports = async (req, res) => {
  const {
    name,
    age,
    date,
  } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }

  if (!date || !date.datedAt || date.rate === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (date.rate < 1 || date.rate > 5 || !Number.isInteger(date.rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!dataRegex.test(String(date.datedAt))) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  const crushes = JSON.parse(await fs.readFile('./crush.json', 'utf-8', (error, response) => {
    if (error) {
      return console.log('Conteúdo não encontrado', error);
    }
    return response;
  }));

  const newCrush = {
    id: crushes.length + 1,
    name,
    age,
    date,
  };

  crushes.push(newCrush);

  await fs.writeFile('crush.json', crushes, 'utf-8', (error, response) => {
    if (error) {
      return console.log('O crush não foi adicionado', error);
    }
    return response;
  });
  res.status(201).json(newCrush);
};
