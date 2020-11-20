const rescue = require('express-rescue');
const { readCrushFile, addNewCrushOnFile } = require('../Services');

module.exports = rescue(async (req, res) => {
  const idToDelete = Number(req.params.id);
  const crushData = await readCrushFile();

  const crushDataWithOneLess = crushData.filter((e) => e.id !== idToDelete);

  await addNewCrushOnFile(crushDataWithOneLess);

  res.status(200).json({ message: 'Crush deletado com sucesso' });
});
