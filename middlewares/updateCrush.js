const { readCrush } = require('../utilities/readCrush');
const { writeCrush } = require('../utilities/writeCrush');

const crushPath = 'crush.json';

module.exports = async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;

  const crushFile = JSON.parse(await readCrush(crushPath));

  const newCrush = {
    id: parseInt(id, 10),
    name,
    age,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };

  const selectedCrush = crushFile.find((crush) => parseInt(id, 10) === crush.id);

  crushFile.splice(selectedCrush.id - 1, 1, newCrush);
  writeCrush(crushPath, crushFile);
  res.status(200).json(newCrush);
};
