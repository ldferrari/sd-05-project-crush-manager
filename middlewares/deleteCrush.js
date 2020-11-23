const { readCrushFile, createCrush } = require('../utils');

module.exports = async (req, res) => {
  const idParam = Number(req.params.id);
  const crushList = JSON.parse(await readCrushFile('./crush.json'));
  await createCrush(
    './crush.json',
    crushList.filter((crush) => crush.id !== idParam),
  );

  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};
