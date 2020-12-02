const { writeCrush } = require('../utilities/writeCrush');
const { readCrush } = require('../utilities/readCrush');

const crushPath = 'crush.json';

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const crushFiles = JSON.parse(await readCrush(crushPath));

  const newCrush = {
    id: crushFiles.length + 1,
    name,
    age,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };

  crushFiles.push(newCrush);
  writeCrush(crushFiles);
  return res.status(201).json(newCrush);
};
