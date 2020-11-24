const { createCrush, readCrushFile, crushVerify } = require('../utils');

module.exports = async (req, res, _next) => {
  const token = req.headers.authorization;
  const { name, age, date } = req.body;
  const { rate, datedAt } = req.body.date ? date : '';
  if (token) {
    const dateValidation = crushVerify(req.body);
    if (dateValidation !== 'ok') {
      return res.status(400).json(dateValidation);
    }
    const crushList = JSON.parse(await readCrushFile('./crush.json'));
    const crush = {
      id: crushList.length + 1,
      name,
      age,
      date: {
        datedAt,
        rate,
      },
    };
    crushList.push(crush);
    await createCrush('./crush.json', crushList);
    return res.status(201).json(crush);
  }
};
