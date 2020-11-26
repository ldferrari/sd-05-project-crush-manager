const fs = require('fs').promises;

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const { datedAt, rate } = req.body.date ? date : '';
  const crushBuscado = Number(req.params.id);
  const verificaData = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/g;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (String(name).length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  if (rate < 1 || rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!date || !datedAt || !rate) {
    return res.status(400).json({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  if (!verificaData.test(String(datedAt))) {
    return res
      .status(400)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  const listCrush = JSON.parse(
    await fs.readFile('crush.json', 'UTF8', (err, data) => {
      if (err) {
        return console.log('Deu ruim');
      }
      return data;
    }),
  );
  const crushCerto = listCrush.find((e) => e.id === crushBuscado);
  const crushCertoIndex = listCrush.indexOf(crushCerto);
  listCrush[crushCertoIndex].name = name;
  listCrush[crushCertoIndex].age = age;
  listCrush[crushCertoIndex].date.datedAt = datedAt;
  listCrush[crushCertoIndex].date.rate = rate;

  await fs.writeFile('crush.json', JSON.stringify(listCrush), 'utf8', (err) => {
    if (err) {
      return console.log('Deu ruim');
    }
    return listCrush;
  });

  res.status(200).json(listCrush[crushCertoIndex]);
};
