const { readCrushFile, addNewCrushOnFile } = require('../Services');

module.exports = async (req, res) => {
  const id = Number(req.params.id);
  const { name, age, date } = req.body;
  const crushData = await readCrushFile();

  const chosenCrush = crushData.find((e) => id === e.id);

  crushData[crushData.indexOf(chosenCrush)] = { id, name, age, date };

  addNewCrushOnFile(crushData);

  res.status(200).json({ id, name, age, date });
};
