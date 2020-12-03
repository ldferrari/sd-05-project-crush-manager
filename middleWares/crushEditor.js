const fs = require('fs').promises;

const readCrushs = async () => {
  const crushs = await fs.readFile('crush.json', 'utf-8', (err) => {
    if (err) throw console.log('deu ruim');
  });
  return JSON.parse(crushs);
};

module.exports = async (req, res) => {
  const findCrush = req.params.id;
  const { name, age, date } = req.body;
  const { datedAt, rate } = req.body.date ? date : '';
  const verifyDate = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/g;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (String(name).length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!date || !datedAt || !rate) {
    return res
      .status(400)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!verifyDate.test(String(datedAt))) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  const results = await readCrushs();
  const filteredCrush = results.find((crush) => crush.id === Number(findCrush));
  results[results.indexOf(filteredCrush)].name = name;
  results[results.indexOf(filteredCrush)].age = age;
  results[results.indexOf(filteredCrush)].date.datedAt = datedAt;
  results[results.indexOf(filteredCrush)].date.rate = rate;
  await fs.writeFile('crush.json', JSON.stringify(results), 'utf-8', (err) => {
    if (err) throw console.log('chega desse projeto :c ');
    return results;
  });
  res.status(200).json(results[results.indexOf(filteredCrush)]);
};
