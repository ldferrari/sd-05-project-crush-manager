const { readCrushFile, createCrush, crushVerify } = require('../utils');

module.exports = async (req, res) => {
  const idParam = Number(req.params.id);
  const { name, date, age } = req.body;
  const { rate, datedAt } = req.body.date ? date : '';
  const dateValidation = crushVerify(req.body);

  if (dateValidation !== 'ok') {
    return res.status(400).json(dateValidation);
  }

  const crushList = JSON.parse(await readCrushFile('./crush.json'));
  const crushIndex = crushList.indexOf((person) => person.id === idParam);
  crushList[crushIndex] = {
    name,
    age,
    date: {
      datedAt,
      rate,
    },
    id: idParam,
  };

  await createCrush('./crush.json', crushList[crushIndex]);
  res.status(200).json(crushList[crushIndex]);
};
